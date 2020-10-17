<template>
  <div class="favorites page">
    <h1 class="page__heading">Favorites</h1>
    <div class="page__center">
      <asteroid 
        v-for="(asteroid, index) in data" 
        :key="asteroid.id" :asteroid="asteroid" 
        :index="index" 
        liked  />
    </div>
  </div>
</template>

<script>
import {COLORS} from '@/constants';
import {emitNavColor} from '@/utils';
import {getfavoriteAsteroids} from '@/firebaseService';

import Asteroid from '@/components/Asteroid';

export default {
  name: 'favorites',
  components: {
    Asteroid
  },
  data(){
    return {
      data: []
    }
  },
  async created(){
    emitNavColor('setNavColor',COLORS.FAVORITES, this);
    this.data = await getfavoriteAsteroids();
  }
}
</script>

<style lang="scss">
.favorites {
  background-color: #35a0fc;
}
</style>