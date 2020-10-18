<template>
  <div class="favorites page">
    <h1 class="page__heading">Favorites</h1>
    <div class="favorites__loading-box" v-if="isLoading">
      <div class="favorites__loading" >Loading...!</div>
    </div>
    <div v-else>
      <div class="page__center" v-if="favorites.length">
        <asteroid 
          v-for="(asteroid, index) in favorites" 
          :key="asteroid.id" :asteroid="asteroid" 
          :index="index" 
          liked  />
      </div>
      <div v-else class="favorites__message">
        <p>No Favorites :(</p>
        <p>Like some asteroids to see them here!</p>
      </div>
    </div>
  </div>
</template>

<script>
import {COLORS} from '@/constants';
import {emitNavColor} from '@/utils';
import {auth, favoritesCollection} from '@/firebaseInit';

import Asteroid from '@/components/Asteroid';

export default {
  name: 'favorites',
  components: {
    Asteroid
  },
  data(){
    return {
      favorites: [],
      isLoading: false,
      unSubscriptions: []
    }
  },
  async created(){
    emitNavColor('setNavColor',COLORS.FAVORITES, this);
    const authUnsubscription = auth.onAuthStateChanged(user => {
      if(user) this.favoritesListener(user.uid);
    });
    this.unSubscriptions.push(authUnsubscription);
  },
  beforeDestroy(){
    this.unSubscriptions.forEach(s => s());
  },
  methods : {
    favoritesListener(userId){
    this.isLoading = true;
      const favoritesUnsbscription = favoritesCollection.where("userId", "==", userId)
        .onSnapshot(favoritesSnapshot => {
          let favorites = [];
          favoritesSnapshot.forEach(doc => {
            favorites.push(doc.data().asteroid);
          });
          this.favorites = favorites;
          this.isLoading = false;
        });
      this.unSubscriptions.push(favoritesUnsbscription);
    }
  }
}
</script>

<style lang="scss">
.favorites {
  background-color: #35a0fc;

  &__message {
    margin-top: -3rem;
    text-align: center;
    color: white;
    min-height: 6rem;
    font-weight: 500;
    font-style: italic;
    text-shadow: 0px 1px 2px rgba(0,0,0, .1);
  }

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