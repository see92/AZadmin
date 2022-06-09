<template>
    <div>
        <el-table-column
            v-for="(item,index) in tableHeader"
            :key="index"
            :label="item.label"
            :prop="item.prop"
        />
    </div>
</template>

<script>
export default {
    name: 'PageMain',
    prop: {
        table_header: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            tableHeader: [
                {
                    label: '网址',
                    prop: 'website'
                },
                {
                    label: '名称',
                    prop: 'name'
                },
                {
                    label: '级别',
                    prop: 'level'
                },
                {
                    label: '公司',
                    prop: 'company'
                }
            ],
            tableData: [
                {
                    website: 'www.baidu.com',
                    name: '百度一下',
                    level: '一级',
                    company: '百度'
                },
                {
                    website: 'www.Google.com',
                    name: '谷歌',
                    level: '一级',
                    company: '谷歌'
                },
                {
                    website: 'github.com',
                    name: 'github',
                    level: '二级',
                    company: 'github'
                },
                {
                    website: 'www.qq.com',
                    name: '腾讯',
                    level: '二级',
                    company: '腾讯'
                }
            ],
            currentRow: null
        }
    },
    methods: {
        setCurrent(row) {
            this.$ref.singleTable.setCurrentRow(row)
        },
        handleCurrentChange(val) {
            this.currentRow = val
        }
    }
}
</script>
