import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'NavigatorView',
      component: () => import('../views/NavigatorView.vue')
    },
    {
      path: '/laodGeojson',
      name: 'LoadGeojson',
      component: () => import('../views/LoadGeojson.vue')
    },
  ]
})

export default router
