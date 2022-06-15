import Layout from '@/layout'
let asyncRoutes = [
    {
        children: [
            {
                path: '/system',
                name: 'system',
                component: Layout,
                redirect: '/system/basicsInformation',
                meta: {
                    title: '基础信息',
                    icon: 'ri-survey-line'
                },
                children: [
                    {
                        parten: 'system',
                        path: 'basicsInformation',
                        name: 'basicsInformation',
                        component: () =>
                            import('@/views/basics/basicsInformation'),
                        meta: {
                            title: '基础信息',
                            sidebar: false,
                            breadcrumb: false,
                            activeMenu: '/system'
                        }
                    }
                ]
            }
        ]
    }
]
export default asyncRoutes
