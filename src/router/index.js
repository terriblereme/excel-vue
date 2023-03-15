import { createRouter, createWebHistory } from 'vue-router'
import admins from './admin'
import {getToken}  from '@/utils/auth';
import mobiles from './mobile';
const routes = [
  {
    path:'/',
    redirect:'/admin/login',
  },
  {
    path: '/excel',
    component: () => import('@/views/admin/execl.vue')
  },
  {
    path: '/web',
    component: () => import('@/views/protal/index.vue'),
    children: [
      {
        path: '/index',
        component: () => import('@/views/protal/home.vue')
      },
      {
        path: '/business',
        component: () => import('@/views/protal/business.vue')
      },
      {
        path: '/company',
        component: () => import('@/views/protal/company.vue')
      },
      {
        path: '/company/culture',
        component: () => import('@/views/protal/culture.vue')
      },
      {
        path: '/company/culture/detail/:id',
        component: () => import('@/views/protal/culture-detail.vue')
      },
      {
        path: '/activity',
        component: () => import('@/views/protal/activity.vue')
      },
      {
        path: '/activity/detail/:id',
        component: () => import('@/views/protal/activity-detail.vue')
      },
      {
        path: '/partybuilding',
        component: () => import('@/views/protal/partybuilding.vue')
      },
      {
        path: '/partybuilding/detail/:id',
        component: () => import('@/views/protal/party-detail.vue')
      },
      {
        path: '/recruitment',
        component: () => import('@/views/protal/recruitment.vue')
      },
      {
        path: '/recruitment/detail/:id',
        component: () => import('@/views/protal/recruitment-detail.vue')
      },
    ]
  },
  ...admins,
  ...mobiles,
 {
    path: '/404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404.vue')
  },{
    path:"/:pathMatch(.*)",
    redirect:"/404"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
//跳转刷新回到顶部
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  //登录拦截
  if(to.meta.requireAuth && getToken()===false){
    if(to.path.includes("mobile")){
      next('/mobile/login');
    }else{
      next('/admin/login');
    }
  }else{
    next()
  }
  document.documentElement.scrollTop=0;
})

export default router
