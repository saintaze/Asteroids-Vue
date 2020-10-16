<template>
  <div class="favorites">
    <div class="favorites__center">

      <asteroid 
        v-for="(asteroid, index) in data" 
        :key="asteroid.id" :asteroid="asteroid" 
        :index="index" 
        liked  />

    </div>
  </div>
</template>

<script>
import Asteroid from '@/components/Asteroid';
import {getfavoriteAsteroids} from '@/firebaseService';

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
    this.data = await getfavoriteAsteroids();
  }
}
</script>

<style lang="scss">
  .likes {
    min-height: 100vh;
    background-color: turquoise;

    &__center {
      // max-width: 35rem;
      max-width: 114rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 7rem 4rem;
      margin: 0 auto;

      @media screen and (max-width: 1180px){
        grid-template-columns: repeat(2, 1fr);
        max-width: 75rem;
      }

      @media screen and (max-width: 800px){
        grid-template-columns: repeat(1, 1fr);
        max-width: 35rem;
      }
    }
  }
</style>