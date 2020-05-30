import Home from '../views/Home.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/wysiwyg',
    name: 'Wysiwyg',
    component: () => import('../views/Wysiwyg.vue'),
  },
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
