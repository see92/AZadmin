import Layout from '@/layout'
// import EmptyLayout from '@/layout/empty'

export default {
    path: '/list_example',
    component: Layout,
    redirect: '/list_example/page',
    name: 'list_example',
    meta: {
        title: '列表',
        icon: 'sidebar-breadcrumb'
    },
    children: [
        {
            path: 'page',
            name: 'listExamplePage',
            component: () => import('@/views/list_example/page'),
            meta: {
                title: '列表'
            }
        }
    ]
}
