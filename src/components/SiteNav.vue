<template>
  <nav class="nav" :style="{backgroundColor: navColor}">
    <ul class="nav__left">
      <li class="nav__item">
        <router-link class="nav__link" :to="{name: 'asteroids'}">Asteroids</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{name: 'search'}">Search</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{name: 'find'}">Find</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{name: 'favorites'}" v-if="isLoggedIn">Favorites</router-link>
      </li>
    </ul>
    <ul class="nav__right">
      <li class="nav__item" v-if="!isLoggedIn">
        <router-link class="nav__link" to="/auth/signup">Signup</router-link>
      </li>
      <li class="nav__item" v-if="isLoggedIn">
        <a @click="signout" class="nav__link">Signout</a>
      </li>
      <li class="nav__item" v-if="!isLoggedIn">
        <router-link class="nav__link" to="/auth/signin">Signin</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {signout, isLoggedIn} from '@/firebaseService';
import {auth} from '@/firebaseInit';

export default {
  name: 'site-nav',
  props: {
    navColor: String
  },
  data(){
    return {
      isLoggedIn: false
    }
  },
  created(){
    auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    })
  },
  methods: {
    signout(){
      signout();
      if(!!this.$router.currentRoute.meta.requiresAuth){
        this.$router.replace({name: 'asteroids'});
      }
      this.isLoggedIn = false;
    }
  }
}
</script>

<style lang="scss">
  .nav {
    padding: 1rem 2rem;
    min-height: 12rem;
    display: flex;
    justify-content: space-between;

    .router-link-active {
      backface-visibility: hidden;
      transition: all .3s;
      transform: translateX(-3px);
      font-size: 1.42rem;
      // transform: scale(1.08);
    }

    &__left, &__right {
       list-style-type: none; 
       color: white; 
    } 

    &__item {
      display: block;
      margin-right: 1rem;
    }

    &__link {
      cursor: pointer;
      display: inline-block;
      font-size: 1.3rem;
      color: white;
      font-family: 'Audiowide', cursive;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
      transition: all .3s;

      &:hover {
        transition: all .3s;
        color: darken(white, 5);
      }
    }
  }
</style>

  
