import Vue from 'vue'
import Router from 'vue-router'

import Layout from "@/layout/default"

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        component:Layout,
        redirect:"/dashboard",
        children: [
            {
                path: '/dashboard',
                name:"dashboard",
                component: () => import('@/views/dashboard/index'),
            }
        ]
    },{
        path: '/login',
        name:"login",
        component: () => import('@/views/login/index')
    },{
        path: '/house',
        component:Layout,
        children: [
            {
                path: '/house/index',
                name:"house_index",
                component: () => import('@/views/house/index'),
            },
            {
                path: '/house/houseList',
                name:"houseList",
                component: () => import('@/views/house/houseList'),
            },
            {
                path: '/house/roomList',
                name:"roomList",
                component: () => import('@/views/house/roomList'),
            },
            {
                path: '/house/formHouse',
                name:"formHouse",
                component: () => import('@/views/house/formHouse'),
            },
            {
                path: '/house/detailHouse',
                name:"detailHouse",
                component: () => import('@/views/house/detailHouse'),
            },
            {
                path: '/house/houseView',
                name:"houseView",
                component: () => import('@/views/house/houseView'),
            },
            {
                path: '/house/detailRoom',
                name:"detailRoom",
                component: () => import('@/views/house/detailRoom'),
            },
            {
                path: '/house/formRoom',
                name:"formRoom",
                component: () => import('@/views/house/formRoom'),
            },
            {
                path: '/house/formUser',
                name:"formUser",
                component: () => import('@/views/house/formUser'),
            },
            {
                path: '/house/detailUser',
                name:"detailUser",
                component: () => import('@/views/house/detailUser'),
            },
            {
                path: '/house/visitList',
                name:"visitList",
                component: () => import('@/views/house/visitList'),
            },
            {
                path: '/house/detailVisit',
                name:"detailVisit",
                component: () => import('@/views/house/detailVisit'),
            },
            {
                path: '/house/formVisit',
                name:"formVisit",
                component: () => import('@/views/house/formVisit'),
            }
        ]
    },{
        path: '/dome',
        component:Layout,
        children: [
            {
                path: '/dome/index',
                name:"index",
                component: () => import('@/views/dome/index'),
            }
        ]
    },{
        path:"/position",
        name:"position",
        component: () => import('@/views/position/index')
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router