<template>
    <div class="">
        <el-pagination
            :background="paginationData.isbackground"
            :prev-text="paginationData.prevText"
            :next-text="paginationData.nextText"
            :page-sizes="[10, 20, 30]"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSizes"
            :hide-on-single-page="paginationData.hideOnSinglePage"
            layout="total,sizes,prev,pager,next,jumper"
            :total="paginationData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
        />
    </div>
</template>
    <!--
        background  为分页添加背景色
        prev-text   替代图标显示的上一页文字
        next-text   替代图标显示的下一页文字
        page-sizes  每页显示个数选择器的选项设置
        current-page    当前页数
        page-size   每页显示条目个数
        hide-on-single-page 只有一页时是否隐藏
        layout  组件布局
        total   总条目数
        size-change     pageSize改变时会触发,每页条数
        current-change  currentPage改变时会触发 当前页
        prev-click      用户点击上一页按钮改变当前页后触发
        next-click      用户点击下一页按钮改变当前页后触发
    -->
<script>
export default {
    props: {
        paginationData: {
            type: Object,
            default() {
                return {
                    prevText: '',
                    nextText: '',
                    singlePage: false,
                    isbackground: true
                }
            }
        }
    },
    data() {
        return {
            pagination: {
                currentPage: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pagination.pageSize = val
            this.$emit('handleCurrentChange', this.pagination)
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val
            this.$emit('handleCurrentChange', this.pagination)
        },
        prevClick(data) {
            this.$emit('prevClick', data)
        },
        nextClick(data) {
            this.$emit('nextClick', data)
        }
    }
}
</script>
