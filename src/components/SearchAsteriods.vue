<template>
  <div class="search">
    <h1 class="search__heading">Search Asteroid <router-link class="asteroids__search" to="/search">Search</router-link></h1>

    <div class="search__center">
      <input class="search__date" type="date" @change="setStartDate">
      <input class="search__date" type="date" @change="setEndDate">
      <button @click="getAsteroids">Search</button>
    </div>
  </div>
</template>

<script>
import {API_ENDPOINT__ASTEROIDS_DATE} from '@/constants';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'search-asteriods',
  data(){
    return {
      startDate: '',
      endDate: '',
      asteroids: []
    }
  },
  computed: {
    datesAreValid(){
      if(!this.startDate || !this.endDate) return false;
      const validEndDate = moment(this.startDate).add(8, 'days');
      const startDateCutoff = moment(this.startDate).subtract(1, 'days');
      const isValidEndDate = moment(this.endDate).isBetween(startDateCutoff, validEndDate);
      return isValidEndDate;
    }
  },
  methods: {
    setStartDate(e){
      this.startDate = e.target.value;
    },
    setEndDate(e){
      this.endDate = e.target.value;
    },
    
    async getAsteroids(){
      //start_date=2007-03-03&end_date=2008-05-07
      if(!this.datesAreValid){
        // this.errorMessage()
        return
      };
      const dateParams = `start_date=${this.startDate}&end_date=${this.endDate}`
      try {
        const res = await axios.get(`${API_ENDPOINT__ASTEROIDS_DATE}&${dateParams}`);
        console.log(res.data)
      }catch(e){
        console.log(e)
      }
      // console.log(`${API_ENDPOINT__ASTEROIDS_DATE}&${dateParams}`)
  
    }
  }
}
</script>

<style lang="scss">
  .search {
    background-color: #fc357e;
    min-height: 100vh;
    padding: 9rem 0;

    &__heading {
      text-align: center;
      font-family: 'Monoton', cursive;
      color: white;
      margin-bottom: 9rem;
      font-size: 3.8rem;
      position: relative;
      line-height: 1;
      word-spacing: 1rem;
    }


     &__center {
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

    &__date {
      padding: 0rem 2rem;
      border: none;
      outline: none;
      border-radius: 2px;
      font-family: 'AUDIOWIDE';
      color: #444;
      height: 5rem;
      font-size: 1.2rem;
      width: 25rem;
    }



  }
</style>