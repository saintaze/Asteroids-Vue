<template>
  <div class="asteroids">
    <!-- <img src="@/assets/a-1.jpg" /> -->
    <!-- <img :src="require('@/assets/a-1.jpg')" /> -->
    <h1 class="asteroids__heading">Asteroids <router-link class="asteroids__search" to="/search">Search</router-link></h1>
    <div class="asteroids__center">

      <asteroid v-for="(asteroid, index) in data" :key="asteroid.id" :asteroid="asteroid" :index="index"/>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {API_ENDPOINT_ASTEROIDS} from '@/constants';
import data from '@/data';
import Asteroid from '@/components/Asteroid';

export default {
  name: 'asteriods',
  components: {
    Asteroid
  },
  data(){
    return {
      asteriods: [],
      data: data
    }
  },
  async created() {
    // this.initializeAsteriods();
    console.log(data);
  }, 
  methods: {
    async initializeAsteriods(){
      const {data} = await axios.get(API_ENDPOINT_ASTEROIDS);
      this.asteriods = data.near_earth_objects
      console.log(this.asteriods);
    }
    
  }
}
</script>


<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Monoton&display=swap');

.asteroids {
  background-color: #fc6035;
  padding: 9rem 0;

  &__heading {
    text-align: center;
    font-family: 'Monoton', cursive;
    color: white;
    margin-bottom: 9rem;
    font-size: 3.8rem;
    position: relative;
    line-height: 1;
  }

  &__search {
    position: absolute;
    top: 0;
    right: 14.2rem;
    font-size: 1.3rem;
    color: white;
    // text-transform: lowercase;
    font-family: 'Audiowide', cursive;

    &:hover {
      transition: all .3s;
      color: darken(white, 6)
    }

  }

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
