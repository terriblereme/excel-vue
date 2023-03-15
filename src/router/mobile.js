const mobiles = [
    {
        path:'/mobile',
        redirect:"/mobile/home",
        component: () => import('@/views/mobile/index.vue'),
        children:[
            {
                path:'company',
                component: () => import('@/views/mobile/company.vue'),
            },
            {
                path:'activity',
                component: () => import('@/views/mobile/activity.vue'),
            },
            {
                path:'recruitment',
                component: () => import('@/views/mobile/recruitment.vue'),
            },
            {
                path:'contactus',
                component: () => import('@/views/mobile/contactus.vue'),
            },
            {
                path:'detail/:id',
                component: () => import('@/views/mobile/detail.vue'),
            },
            // 来访预约
            {
                path:'home',
                component: () => import('@/views/mobile/rigister/home.vue'),
            },
            {
                path:'register',
                component: () => import('@/views/mobile/rigister/register.vue'),
                meta:{
                    title:"来访登记",
                },
            },
            {
                path:'search',
                component: () => import('@/views/mobile/rigister/search.vue'),
                meta:{
                    title:"登记查询",
                },
            },
            {
                path:'login',
                component: () => import('@/views/mobile/rigister/login.vue'),
            },
            {
                path:'manage',
                component: () => import('@/views/mobile/rigister/manage.vue'),
                meta:{
                    title:"来访管理",
                    requireAuth:true,
                },
            },
            {
                path:'editpsw',
                component: () => import('@/views/mobile/rigister/editpsw.vue'),
                meta:{
                    title:"修改密码",
                    requireAuth:true,
                },
            }
        ]
    },
   

]
export default mobiles