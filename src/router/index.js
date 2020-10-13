import Vue from 'vue'
import VueRouter from 'vue-router'
import Asteriods from '@/components/Asteriods.vue';
import SearchAsteriods from '@/components/SearchAsteriods.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/asteriods'
  },
  {
    path: '/asteriods',
    component: Asteriods
  },
  {
    path: '/search',
    component: SearchAsteriods
  },
  {
    path: '*',
    redirect: '/asteriods'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
