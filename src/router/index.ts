import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
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

export default router
