import storage from '@/util/storage'
import api from '@/api'
import asyncRoutes from '@/router/componentsRouter'

let newAsyncRoutes = [
    {
        meta: {
            title: '后台',
            icon: 'sidebar-default'
        },
        children: []
    }
]

const state = {
    account: storage.local.get('account'),
    token: storage.local.get('token'),
    failure_time: storage.local.get('failure_time') || '',
    permissions: [],
    //  处理完成
    checkData: [],
    // 未处理
    noCheckData: storage.local.get('NcheckRouterData')
        ? JSON.parse(storage.local.get('NcheckRouterData'))
        : ''
}

const getters = {
    isLogin: state => {
        let retn = false
        if (state.token && state.token != null) {
            // let unix = Date.parse(new Date())
            // if (unix < state.failure_time * 1000) {
            retn = true
            // }
        }
        return retn
    },
    // 取未处理
    getNoCheckData: state => {
        return state.noCheckData
    }
}

const actions = {
    login({ commit }) {
        return new Promise((resolve, reject) => {
            api.get('api/account/get_token?phone=110&code=110').then(res => {
                commit('setUserData', res)
                api.get('api/account/GetUser').then(res => {
                    api.get('api/account/get_permission_menu').then(response => {
                        // 后台返回数据
                        response.forEach(item => {
                            if (item.childrenList && item.childrenList.length > 0) {
                                item.childrenList.forEach(each => {
                                    // each.parten = item.resourceUrl
                                    each.parten = item.perms
                                })
                            }
                        })
                        commit('NcheckRouterData', response)
                        storage.local.set(
                            'NcheckRouterData',
                            JSON.stringify(response)
                        )
                        // 处理完成
                        commit('checkRouter', newAsyncRoutes)
                        resolve()
                    }).catch(() => {
                        reject()
                    })
                })
            })

        })
    },
    logout({ commit }) {
        commit('removeUserData')
        commit('menu/invalidRoutes', null, { root: true })
        commit('tabbar/clean', null, { root: true })
    },
    // 获取我的权限
    getPermissions({ state, commit }) {
        return new Promise(resolve => {
            // 通过 mock 获取权限
            api.get('mock/member/permission', {
                params: {
                    account: state.account
                }
            }).then(res => {
                commit('setPermissions', res.data.permissions)
                resolve(res.data.permissions)
            })
        })
    },
    // 处理数据
    getCheckRouterData({ state, commit }) {
        newAsyncRoutes = [
            {
                meta: {
                    title: '后台',
                    icon: 'sidebar-default'
                },
                children: []
            }
        ]

        let _newMap = new Map()
        asyncRoutes[0].children.forEach(k => {
            console.log(k)
            _newMap.set(k.name, k)
        })
        state.noCheckData.forEach(item => {
            if (item.children && item.children.length > 0) {
                let newCheckData = _newMap.get(item.children[0].parten)
                if (!newCheckData) {
                    commit('removeUserData')
                }
                let newParent = {}
                let newChild = []
                item.children.forEach(each => {
                    newCheckData.children.forEach(sourceItem => {
                        if (
                            // each.resourceUrl == sourceItem.path &&
                            each.perms == sourceItem.path &&
                            newCheckData.children.length != item.children.length
                        ) {
                            newChild.push(sourceItem)
                            newParent = {
                                path: newCheckData.path,
                                name: newCheckData.name,
                                component: newCheckData.component,
                                redirect: `/${newCheckData.name}/${sourceItem.name}`,
                                meta: newCheckData.meta,
                                children: newChild
                            }
                            sourceItem.meta = {
                                title: sourceItem.meta.title,
                                sidebar: true,
                                breadcrumb: true,
                                activeMenu: ''
                            }
                        }
                        // if (!each.resourceUrl || each.resourceUrl && newCheckData.children.length == item.children.length) {
                        if (!each.perms || each.perms && newCheckData.children.length == item.children.length) {
                            newParent = {
                                path: newCheckData.path,
                                name: newCheckData.name,
                                component: newCheckData.component,
                                redirect: `/${newCheckData.name}/${sourceItem.name}`,
                                meta: newCheckData.meta,
                                children: newCheckData.children
                            }
                            // if (sourceItem.name == each.resourceUrl) {
                            if (sourceItem.name == each.perms) {
                                sourceItem.meta = {
                                    title: sourceItem.meta.title,
                                    sidebar: true,
                                    breadcrumb: true,
                                    activeMenu: ''
                                }
                            }
                        }
                    })
                })
                // console.log(newAsyncRoutes[0].children, "nnn");
                newAsyncRoutes[0].children.push(newParent)
            } else {
                // let newCheckData = _newMap.get(item.resourceUrl)
                let newCheckData = _newMap.get(item.perms)
                if (!newCheckData) {
                    commit('removeUserData')
                }
                let newParent = {
                    path: newCheckData.path,
                    name: newCheckData.name,
                    component: newCheckData.component,
                    redirect: newCheckData.redirect,
                    meta: newCheckData.meta,
                    children:
                        newCheckData.children.length == 1
                            ? newCheckData.children
                            : []
                    // children: []
                }
                newAsyncRoutes[0].children.push(newParent)
            }
        })
        commit('checkRouter', newAsyncRoutes)
        return newAsyncRoutes
    },
    getNewRouterInfo({ commit }) {
        return api.get('api/account/get_permission_menu').then(response => {
            // 后台返回数据
            response.forEach(item => {
                if (item.childrenList && item.childrenList.length > 0) {
                    item.childrenList.forEach(each => {
                        // each.parten = item.resourceUrl
                        each.parten = item.perms
                    })
                }
            })
            commit('NcheckRouterData', response)
            storage.local.set(
                'NcheckRouterData',
                JSON.stringify(response)
            )
            return response
        })
    }
}

const mutations = {
    setUserData(state, data) {
        // storage.local.set('account', data.account)
        // storage.local.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJBUFAiLCJpc3MiOiJTZXJ2aWNlIiwidXNlcklkIjoiMjMiLCJpYXQiOjE2NTUxMzM0OTV9.BnC8B_pWYMtEmTnFsV7mLHyJ2GvVKt_FWNeG23m1NG4')
        // storage.local.set('failure_time', data.failure_time)
        // state.account = data.account
        // state.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJBUFAiLCJpc3MiOiJTZXJ2aWNlIiwidXNlcklkIjoiMjMiLCJpYXQiOjE2NTUxMzM0OTV9.BnC8B_pWYMtEmTnFsV7mLHyJ2GvVKt_FWNeG23m1NG4'
        // state.failure_time = data.failure_time
        state.token = data.token
    },
    checkRouter(state, data) {
        data.forEach(item => {
            item.children = item.children.filter(
                (item, index, self) => self.indexOf(item) == index
            )
        })
        state.checkData = data
    },
    NcheckRouterData(state, data) {
        state.noCheckData = data
    },
    removeUserData(state) {
        storage.local.remove('account')
        storage.local.remove('token')
        storage.local.remove('failure_time')
        storage.local.remove('NcheckRouterData')
        state.account = ''
        state.token = ''
        state.failure_time = ''
        state.checkData = ''
        state.noCheckData = ''
    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
