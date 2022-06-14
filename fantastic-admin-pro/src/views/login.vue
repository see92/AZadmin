<template>
    <div>
        <div class="bg-banner" />
        <div id="login-box">
            <div class="login-banner" />
            <el-form
                v-show="formType == 'login'"
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                size="default"
                class="login-form"
                autocomplete="on"
                label-position="left"
            >
                <div class="title-container">
                    <h3 class="title">{{ title }}管理后台</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input
                            ref="name"
                            v-model="loginForm.account"
                            :placeholder="$t('app.account')"
                            type="text"
                            maxlength="11"
                            tabindex="1"
                            autocomplete="on"
                        >
                            <svg-icon slot="prefix" name="user" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            ref="password"
                            v-model="loginForm.password"
                            type="text"
                            :placeholder="$t('app.password')"
                            tabindex="2"
                            autocomplete="on"
                            @keyup.enter.native="handleLogin"
                        >
                            <svg-icon slot="prefix" name="password" />
                        </el-input>
                        <el-button
                            class="code"
                            type="primary"
                            @click="getCode(loginForm.account)"
                        >
                            {{ codeMsg }}
                        </el-button>
                    </el-form-item>
                </div>
                <el-button
                    :loading="loading"
                    type="primary"
                    size="default"
                    style="width: 100%;"
                    @click.native.prevent="getMenu"
                >
                    {{ $t("app.login") }}
                </el-button>
            </el-form>
        </div>
        <Copyright v-if="$store.state.settings.showCopyright" />
    </div>
</template>

<script>
import storage from '@/util/storage'

export default {
    name: 'Login',
    data() {
        return {
            title: process.env.VUE_APP_TITLE,
            // 表单类型，login 登录，reset 重置密码
            formType: 'login',
            loginForm: {
                account: storage.local.get('login_account'),
                password: '',
                remember: storage.local.has('login_account')
            },
            loginRules: {
                account: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
                password: [
                    { required: true, trigger: 'blur', message: '请输入验证码' },
                    { min: 0, max: 6, trigger: 'blur', message: '验证码长度为0到6位' }
                ]
            },
            resetForm: {
                account: storage.local.get('login_account'),
                captcha: '',
                newPassword: ''
            },
            loading: false,
            passwordType: 'number',
            redirect: undefined,
            codeDisabled: false,
            codeMsg: '获取验证码',
            countdown: 60,
            timer: null
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        showPassword() {
            this.passwordType = this.passwordType === 'password' ? '' : 'password'
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$api
                        .get(
                            `api/account/get_token?phone=${this.loginForm.account}&code=${this.loginForm.password}`
                        )
                        .then(res => {
                            // this.$router.push({ path: this.redirect || '/' })
                            localStorage.setItem('token', res.token), console.log(res.token)
                            this.getUser()
                        })
                    // this.loading = true
                    // this.$store
                    //     .dispatch('user/login', this.loginForm)
                    //     .then(() => {
                    //         this.loading = false
                    //         if (this.loginForm.remember) {
                    //             storage.local.set('login_account', this.loginForm.account)
                    //         } else {
                    //             storage.local.remove('login_account')
                    //         }
                    //         this.$router.push({ path: this.redirect || '/' })
                    //     })
                    // .catch(() => {
                    //     this.loading = false
                    // })
                }
            })
        },
        // 获取验证码
        getCode(mobile) {
            // this.$api.get(`api/account/get_sms_code?phone=${mobile}`).then(res => {
            this.$api.get('api/account/get_sms_code?phone=110').then(res => {
                // console.log(res)
            })
            // 手机号校验获取验证码
            // const phoneReg = /^1[3456789]\d{9}$/
            // if (!phoneReg.test(mobile)) {
            //     this.$message.success('请输入正确格式的手机号')
            // } else {
            //     this.$api
            //         .get(`api/account/get_sms_code?phone=${mobile}`)
            //         .then(res => {
            //             console.log(res)
            //         })
            // }
            // 倒计时获取验证码
            if (!this.timer) {
                this.timer = setInterval(() => {
                    if (this.countdown > 0 && this.countdown <= 60) {
                        this.countdown--
                        if (this.countdown !== 0) {
                            this.codeMsg = `${this.countdown} S`
                        } else {
                            clearInterval(this.timer)
                            this.codeMsg = '获取验证码'
                            this.countdown = 60
                            this.timer = null
                            this.codeDisabled = false
                        }
                    }
                }, 1000)
            }
        },
        // 获取token
        getToken() {
            this.$api.get('api/account/get_token?phone=110&code=110').then(res => {
                // storage.local.set('token', res.token)
                this.$store.commit('user/setUserData', res)
                this.getMenu()
            })
        },
        // 获取当前用户
        getUser() {
            this.$api.get('api/account/GetUser').then(res => {
                // console.log(res.token, 'rrr')
                // this.getMenu()
            })
        },
        // 获取权限菜单
        // getMenu() {
        //     this.$api.get('api/account/get_permission_menu').then(res => {
        //         console.log(res, '权限列表')
        //         this.$router.push({path: this.redirect || '/'})
        //     })
        // }
        getMenu() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$store.dispatch('user/login').then(() => {
                        if (this.loginForm.remember) {
                            storage.local.set('login_account', this.loginForm.account)
                        } else {
                            storage.local.remove('login_account')
                        }
                        this.$router.push({
                            path: `/${
                                JSON.parse(storage.local.get('NcheckRouterData'))[0].perms
                            }`
                        })
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
[data-mode="mobile"] {
    #login-box {
        max-width: 80%;
        .login-banner {
            display: none;
        }
    }
}
::v-deep input[type="password"]::-ms-reveal {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/login-bg.jpg);
    background-size: cover;
    background-position: center center;
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px #999;
    .login-banner {
        width: 300px;
        background-image: url(../assets/images/login-banner.jpg);
        background-size: cover;
        background-position: center center;
    }
    .login-form {
        width: 450px;
        padding: 50px 35px 30px;
        overflow: hidden;
        .svg-icon {
            vertical-align: -0.35em;
        }
        .title-container {
            position: relative;
            .title {
                font-size: 22px;
                color: #666;
                margin: 0 auto 30px;
                text-align: center;
                font-weight: bold;
                @include text-overflow;
            }
        }
    }
    ::v-deep .el-input {
        height: 48px;
        line-height: inherit;
        width: 100%;
        input {
            height: 48px;
        }
        .el-input__prefix {
            left: 10px;
        }
        .el-input__suffix {
            right: 10px;
        }
    }
    .flex-bar {
        display: flex;
        justify-content: space-between;
    }
    .el-checkbox {
        margin: 20px 0;
    }
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
    mix-blend-mode: difference;
}
::v-deep .el-form-item__content {
    display: flex;
}
.code {
    margin-left: 20px;
    display: inline-block;
    min-width: 112px;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
::v-deep input[type="‘number’"] {
    -moz-appearance: textfield !important;
}
</style>
