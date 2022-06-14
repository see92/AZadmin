import Layout from '@/layout'
let asyncRoutes = [
    {
        children: [
            {
                path: '/basics',
                name: 'basics',
                component: Layout,
                redirect: '/basics/basicsInformation',
                meta: {
                    title: '基础信息',
                    icon: 'ri-survey-line'
                },
                children: [
                    {
                        parten: 'basics',
                        path: 'basicsInformation',
                        name: 'basicsInformation',
                        component: () =>
                            import('@/views/basics/basicsInformation'),
                        meta: {
                            title: '基础信息',
                            sidebar: false,
                            breadcrumb: false,
                            activeMenu: '/basics'
                        }
                    }
                ]
            }
        ]
    }
]
export default asyncRoutes
