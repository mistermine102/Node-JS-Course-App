import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: '/', component: () => import('./components/home.vue') }]

const Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default Router
