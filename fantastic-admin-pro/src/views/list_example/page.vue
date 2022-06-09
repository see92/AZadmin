<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%;"
        >
            <el-table-column
                type="index"
                fixed="left"
                align="center"
                label="序号"
                width="50"
            />
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="add(scope.row)">增加</el-button>
                    <el-button @click="add(scope.row)">增加</el-button>
                    <el-button @click="add(scope.row)">增加</el-button>
                </template>
            </el-table-column>
            <PageMain :table_header="tableHeader" />
        </el-table>
    </div>
</template>

<script>
import PageMain from './pageMain'
export default {
    name: 'Page',
    components: {
        PageMain
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
            ]
        }
    }
}
</script>
