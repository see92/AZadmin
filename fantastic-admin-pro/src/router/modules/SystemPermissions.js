import Layout from '@/layout'

export default {
    path: '/SystemPermissions',
    component: Layout,
    redirect: '/SystemPermissions/user',
    name: 'SystemPermissions',
    meta: {
        title: '系统权限',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'user',
            name: 'SystemPermissions_user',
            component: () => import('@/views/SystemPermissions/user'),
            meta: {
                title: '用户管理'
            }
        },
        {
            path: 'role',
            name: 'SystemPermissions_role',
            component: () => import('@/views/SystemPermissions/role'),
            meta: {
                title: '角色管理'
            }
        }
    ]
}
