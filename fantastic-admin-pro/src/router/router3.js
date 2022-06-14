[
    {
        menu_id: '81283aee-6d26-1f98-4f2a-853c7008d6f7',
        menu_name: '系统管理',
        perms: 'system',
        menu_icon: 'system',
        parent_id: '0',
        sort: 1,
        path: null,
        component: null,
        menu_type: 1,
        menu_status: 1,
        childrenList: [
            {
                childrenList: [
                    {
                        childrenList: [],
                        menu_id: '1f6ea2e9-18f4-1ed1-dd3d-32a4ba630ddb',
                        menu_name: '添加用户',
                        perms: 'system:user:add',
                        menu_icon: 'add',
                        parent_id: '9f342051-8355-0023-6697-859aee793415',
                        sort: 1,
                        path: null,
                        component: null,
                        menu_type: 3,
                        menu_status: 1
                    },
                    {
                        childrenList: [
                            {
                                childrenList: [],
                                menu_id: 'a1dd81c4-cb06-94eb-b0fb-4ade47de3497',
                                menu_name: '超管测试页',
                                perms: 'ceshi2',
                                menu_icon: '2',
                                parent_id:
                                    'af81c26c-ca42-f583-3412-d69be9683bb1',
                                sort: 1,
                                path: null,
                                component: null,
                                menu_type: 2,
                                menu_status: 1
                            }
                        ],
                        menu_id: 'af81c26c-ca42-f583-3412-d69be9683bb1',
                        menu_name: '超理管理',
                        perms: 'ceshi',
                        menu_icon: 'ceshi',
                        parent_id: '9f342051-8355-0023-6697-859aee793415',
                        sort: 1,
                        path: null,
                        component: null,
                        menu_type: 1,
                        menu_status: 1
                    },
                    {
                        childrenList: [],
                        menu_id: '8feb504a-bb04-ed66-9635-1236883eb999',
                        menu_name: '修改用户',
                        perms: 'system:user:edit',
                        menu_icon: 'edit',
                        parent_id: '9f342051-8355-0023-6697-859aee793415',
                        sort: 2,
                        path: null,
                        component: null,
                        menu_type: 3,
                        menu_status: 1
                    },
                    {
                        childrenList: [],
                        menu_id: '83904f84-03c5-77e4-1a03-c9acf801aae4',
                        menu_name: '删除用户',
                        perms: 'system:user:delete',
                        menu_icon: 'delete',
                        parent_id: '9f342051-8355-0023-6697-859aee793415',
                        sort: 3,
                        path: null,
                        component: null,
                        menu_type: 3,
                        menu_status: 1
                    }
                ],
                menu_id: '9f342051-8355-0023-6697-859aee793415',
                menu_name: '用户管理',
                perms: 'system:user',
                menu_icon: 'user',
                parent_id: '81283aee-6d26-1f98-4f2a-853c7008d6f7',
                sort: 1,
                path: null,
                component: null,
                menu_type: 2,
                menu_status: 1
            },
            {
                childrenList: [
                    {
                        childrenList: [],
                        menu_id: '20910c16-7073-c18d-b788-d02098353cf1',
                        menu_name: '添加角色',
                        perms: 'system:role:add',
                        menu_icon: 'add',
                        parent_id: 'f2e05f97-45fb-5f60-3b98-baa98041f8ea',
                        sort: 1,
                        path: null,
                        component: null,
                        menu_type: 3,
                        menu_status: 1
                    },
                    {
                        childrenList: [],
                        menu_id: 'e055bb08-caf8-da0f-b28d-7518c1bf7697',
                        menu_name: '修改角色',
                        perms: 'system:role:edit',
                        menu_icon: 'edit',
                        parent_id: 'f2e05f97-45fb-5f60-3b98-baa98041f8ea',
                        sort: 2,
                        path: null,
                        component: null,
                        menu_type: 3,
                        menu_status: 1
                    },
                    {
                        childrenList: [],
                        menu_id: '1b555283-c157-b24c-3530-01bffdce9ba5',
                        menu_name: '删除角色',
                        perms: 'system:role:delete',
                        menu_icon: 'delete',
                        parent_id: 'f2e05f97-45fb-5f60-3b98-baa98041f8ea',
                        sort: 3,
                        path: null,
                        component: null,
                        menu_type: 3,
                        menu_status: 1
                    }
                ],
                menu_id: 'f2e05f97-45fb-5f60-3b98-baa98041f8ea',
                menu_name: '角色管理',
                perms: 'system:role',
                menu_icon: 'role',
                parent_id: '81283aee-6d26-1f98-4f2a-853c7008d6f7',
                sort: 2,
                path: null,
                component: null,
                menu_type: 2,
                menu_status: 1
            },
            {
                childrenList: [],
                menu_id: 'e3159320-22ec-4573-4f94-e471ed3c5802',
                menu_name: '权限管理',
                perms: 'system:menu',
                menu_icon: 'menu',
                parent_id: '81283aee-6d26-1f98-4f2a-853c7008d6f7',
                sort: 3,
                path: null,
                component: null,
                menu_type: 2,
                menu_status: 1
            }
        ]
    }
],

[
    {
        adminRoleResourceName: '系统管理',
        resourceUrl: 'system',
        childrenList: []
    },
    {
        adminRoleResourceName: '角色管理',
        resourceUrl: 'systemRole',
            childrenList: [
                {
                    adminRoleResourceName: '添加角色',
                    resourceUrl: 'systemRole:add'
                }
        ]
    }
]



adminRoleResourceName:'权限管理'
resourceUrl: 'system:menu',
children:[
    
]
