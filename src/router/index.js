import Vue from 'vue'
import VueRouter from 'vue-router'
import AsteriodsList from '@/components/AsteriodsList.vue';
import SearchAsteriods from '@/components/SearchAsteriods.vue';
import Signin from '@/components/Signin.vue';
import Signup from '@/components/Signup.vue';
import Likes from '@/components/Likes.vue';


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
    path: '/signin',
    component: Signin,
    name: 'signin'
  },
  {
    path: '/signup',
    component: Signup,
    name: 'signup'
  },
  {
    path: '/likes',
    component: Likes,
    name: 'likes',
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
// router.beforeEach((to, from, next)=>{
//   if(to.meta.requiresAuth && !auth){
//     next({name: 'signin'})
//   }else {
//     next();
//   }
// })

export default router

 


