<template>
  <div class="asteroids page">
    <!-- <img src="@/assets/a-1.jpg" /> -->
    <!-- <img :src="require('@/assets/a-1.jpg')" /> -->
    <h1 class="page__heading">Asteroids</h1>
    <div class="asteroids__loading-box" v-if="isLoading">
      <div class="asteroids__loading" >Loading...!</div>
    </div>
    <div class="page__center">
      <asteroid 
        v-for="(asteroid, index) in data" 
        :key="asteroid.id" 
        :asteroid="asteroid" 
        :index="index" 
        :liked="isFavoriteId(asteroid.id)" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import {API, COLORS} from '@/constants';
import {emitNavColor} from '@/utils';
import {favoritesCollection, auth} from '@/firebaseInit';

import Asteroid from '@/components/Asteroid';

export default {
  name: 'asteriods',
  components: {
    Asteroid
  },
  data(){
    return {
      data: [],
      isLoading: false,
      favorites: [],
      unSubscriptions: []
    }
  },
  async created() {
    emitNavColor('setNavColor', COLORS.ASTEROIDS, this);    
    const authUnsubscription = auth.onAuthStateChanged(user => {
      if(user) this.favoritesListener(user.uid);
    });
    this.unSubscriptions.push(authUnsubscription);
    this.getAsteroids();
  },
  beforeDestroy(){
    this.unSubscriptions.forEach(s => s());
  }, 
  methods: {
    async getAsteroids(){
      this.isLoading = true;
      const {data} = await axios.get(API.ASTEROIDS);
      this.data = data.near_earth_objects;
      this.isLoading = false;
    },
    isFavoriteId(id){
      return this.favorites.includes(id);
    },
    favoritesListener(userId){
      const favoritesUnsbscription = favoritesCollection.where("userId", "==", userId)
        .onSnapshot(favoritesSnapshot => {
          let updatedFavorites = [];
          favoritesSnapshot.forEach(doc => {
            updatedFavorites.push(doc.data().asteroid.id);
          });
          this.favorites = updatedFavorites;
        });
      this.unSubscriptions.push(favoritesUnsbscription);
    }
  }
}
</script>


<style lang="scss">

.asteroids {
  background-color: #fc6035;

  &__loading-box {
    position: relative;
  }

  &__loading {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    min-height: 6rem;
    font-weight: 500;
    font-style: italic;
    text-shadow: 0px 1px 2px rgba(0,0,0, .1);
    animation: pulse .4s linear infinite alternate-reverse;
  }
}

</style>
