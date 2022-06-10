<template>
    <div>
        <el-pagination
            :current-page="pagination.page"
            :total="pagination.total"
            :page-size="pagination.size"
            :page-sizes="pagination.sizes"
            :layout="pagination.layout"
            :hide-on-single-page="false"
            class="pagination"
            background
            @size-change="changeSize"
            @current-change="changePageNum"
        />
    </div>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            default: () => {
                return {
                    page: 1,
                    size: 10,
                    total: 0,
                    sizes: [10, 20, 50, 100],
                    layout: 'total,sizes, ->prev,pager,next,jumper'
                }
            }
        },
        onSizeChange: {
            type: Function,
            default: null
        },
        changePage: {
            type: Function,
            default: null
        }
    },
    methods: {
        changeSize: function(val) {
            this.onSizeChange(val)
        },
        changePageNum: function(val) {
            this.changePage(val)
        }
    }
}
</script>
