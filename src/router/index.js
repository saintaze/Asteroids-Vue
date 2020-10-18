import Vue from 'vue';
import VueRouter from 'vue-router';

import {auth} from '@/firebaseInit';

import AsteriodsList from '@/components/AsteriodsList.vue';
import SearchAsteriods from '@/components/SearchAsteriods.vue';
import Favorites from '@/components/Favorites.vue';
import FindAsteroid from '@/components/FindAsteroid.vue';
import Auth from '@/components/Auth.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/asteriods',
    name: 'home',
  },
  {
    path: '/asteriods',
    component: AsteriodsList,
    name: 'asteroids'
  },
  {
    path: '/search',
    component: SearchAsteriods,
    name: 'search'
  },
  {
    path: '/find',
    component: FindAsteroid,
    name: 'find'
  },
  {
    path: '/auth',
    redirect: '/auth/signin',
  },
  {
    path: '/auth/:type',
    component: Auth,
    name: 'auth'
  },
  {
    path: '/favorites',
    component: Favorites,
    name: 'favorites',
    meta: {
      requiresAuth: true
    }
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
});

//route guard
router.beforeEach((to, from, next)=>{
  if(to.meta.requiresAuth && !auth.currentUser){
    next({name: 'auth'});
  }else {
    next();
  }
})

export default router

 


