const admins = [
    {
        path:'/admin/layout',
        component: () => import('@/views/admin/layout.vue'),
        children:[
            {
                path: '/admin',
                meta:{
                    requireAuth:true,
                },
                component: () => import('@/views/admin/index.vue'),
                children: [
                    {
                        path: 'company',
                        component: () => import('@/views/admin/company.vue')
                    },
                    {
                        path: 'register',
                        component: ()  => import('@/views/admin/register/list.vue')
                    },
                    {
                        path: 'adv',
                        component: () => import('@/views/admin/adv/list.vue')
                    },
                    {
                        path: 'content',
                        component: () => import('@/views/admin/content/list.vue')
                    },
                    {
                        path: 'dept',
                        component: () => import('@/views/admin/dept/list.vue')
                    },
                    {
                        path: 'user',
                        component: () => import('@/views/admin/user/list.vue')
                    },
                    {
                        path: 'notice',
                        component: () => import('@/views/admin/notice.vue')
                    },
                    {
                        path: 'sysuser',
                        component: () => import('@/views/admin/system/user.vue')
                    },
                    {
                        path: 'sysrole',
                        component: () => import('@/views/admin/system/role.vue')
                    },

                ]
            },
            {
                path:'/admin/login',
                component: () => import('@/views/admin/login.vue'),
            }
        
        ]
    },
   

]
export default admins