<template>
  <div class="asteroids page">
    <!-- <img src="@/assets/a-1.jpg" /> -->
    <!-- <img :src="require('@/assets/a-1.jpg')" /> -->
    <h1 class="page__heading">Asteroids</h1>
    <div class="page__center">
      <asteroid v-for="(asteroid, index) in data" :key="asteroid.id" :asteroid="asteroid" :index="index"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import {API, COLORS} from '@/constants';
import {emitNavColor} from '@/utils';
import {listData} from '@/data';

import Asteroid from '@/components/Asteroid';


export default {
  name: 'asteriods',
  components: {
    Asteroid
  },
  data(){
    return {
      data: listData
    }
  },
  async created() {
    emitNavColor('setNavColor',COLORS.ASTEROIDS, this);
    // this.getAsteroids();
  }, 
  methods: {
    async getAsteroids(){
      const {data} = await axios.get(API.ASTEROIDS);
      this.data = data.near_earth_objects
      console.log(this.data);
    }
  }
}
</script>


<style lang="scss">

.asteroids {
  background-color: #fc6035;
  
}

</style>
