import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '', // path为空表示默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: {
          requiresAuth: true,
          title: '首页'
        }
      },

      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          requiresAuth: true,
          title: '广告列表'
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
        meta: {
          requiresAuth: true,
          title: '广告位列表'
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          requiresAuth: true,
          title: '课程管理'
        }
      },
      {
        path: '/course/:courseId/editor',
        name: 'course-editor',
        component: () => import(/* webpackChunkName: 'course-editor' */ '@/views/course/editor.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        props: true
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          requiresAuth: true,
          title: '菜单管理'
        }
      },
      {
        path: '/resouce',
        name: 'resouce',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resouce/index.vue'),
        meta: {
          requiresAuth: true,
          title: '资源管理'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          requiresAuth: true,
          title: '角色管理'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          requiresAuth: true,
          title: '用户管理'
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/role/:roleId/alloca-menu',
        name: 'alloca-menu',
        component: () => import(/* webpackChunkName: 'alloca-menu' */ '@/views/role/alloca-menu.vue'),
        props: true
      },
      {
        path: '/role/:roleId/alloca-resource',
        name: 'alloca-resource',
        component: () => import(/* webpackChunkName: 'alloca-resource' */ '@/views/role/alloca-resource.vue'),
        props: true
      }
    ]
  },

  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})
// 全局前置守卫：任何页面的访问都要经过这里
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        // 通过 url 传递查询字符串参数
        query: {
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
