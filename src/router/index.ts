import { user } from '@/main'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/link',
      name: 'link',
      component: () => import('../views/LinkView.vue')
    },
    {
      path: '/passage',
      name: 'passage',
      component: () => import('../views/PassageView.vue'),
    },
    {
      path: '/tagSearch',
      name: 'tagSearch',
      component: () => import('../views/TagSearchView.vue'),
    }
  ]
})
// 路由拦截非管理员进入post界面
router.beforeEach((to, from, next) => {
  if (to.path === '/post' && user.value?.role !== 'admin') {
    return next('/')
    ElMessage.error('该功能仅限管理员使用')
  } else next()
})

export default router
