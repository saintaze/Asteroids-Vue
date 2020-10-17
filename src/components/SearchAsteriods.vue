<template>
  <div class="search page">
    <h1 class="page__heading">Search Asteroids</h1>

    <div class="search__date-box">
      <input class="search__date-input" type="text" v-model="startDate" placeholder="Start Date" @click="markDateInput" @focus="markDateInput">
      <input class="search__date-input" type="text" v-model="endDate" placeholder="End Date" @click="markDateInput" @focus="markDateInput">
      <button class="search__btn" @click="getAsteroids">Search</button>
      <div class="search__messages">
        <div class="search__error">{{errorMessage}}</div>
        <div class="search__loading" v-if="isLoading">Loading...!</div>
      </div>
    </div>

    <div class="search__list" v-for="(value, key) in data" :key="key">
      <h2 class="search__date-heading">{{key | formatDate}}</h2>
      <div class="page__center">
        <asteroid v-for="(asteroid, index) in data[key]" :key="asteroid.id" :asteroid="asteroid" :index="index"/>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import {API, COLORS} from '@/constants';
import {emitNavColor} from '@/utils';
import {searchData} from '@/data';

import Asteroid from '@/components/Asteroid';


export default {
  name: 'search-asteriods',
  components: {
    Asteroid
  },
  data(){
    return {
      startDate: '',
      endDate: '',
      data: {},
      errorMessage: '',
      isLoading: false
    }
  },
  filters: {
    formatDate(dateStr) {
      return moment(dateStr).format("MMM Do, YYYY");
    }
  },
  created(){
    emitNavColor('setNavColor',COLORS.SEARCH, this);
  },
  methods: {
    markDateInput(e){
      e.target.type = 'date';
      this.errorMessage = '';
    },
    clearDateFields(){
      this.startDate = '';
      this.endDate = '';
    },
    setLoading(state){
      this.isLoading = state;
    },
    dateIsEmpty(){
      // if(!this.startDate || !this.endDate || !moment(this.startDate).isValid() || !moment(this.endDate).isValid()){
      //     this.errorMessage = 'Date is Invalid';
      //     return false;
      // }
      // const validEndDate = moment(this.startDate).add(8, 'days');
      // const startDateCutoff = moment(this.startDate).subtract(1, 'days');
      // const isValidEndDate = moment(this.endDate).isBetween(startDateCutoff, validEndDate);
      // return isValidEndDate;
      if(!this.startDate || !this.endDate) {
          this.errorMessage = 'Enter Date!';
          return true;
      }
      return false;
    },
    async getAsteroids(){
      if(this.dateIsEmpty()) return;
      try {
        const dateParams = `start_date=${this.startDate}&end_date=${this.endDate}`;
        this.setLoading(true);
        const {data} = await axios.get(`${API.ASTEROIDS_DATE_SEARCH}&${dateParams}`);
        this.data = data.near_earth_objects;
        this.clearDateFields();
        if(!Object.keys(this.data).length){
          this.errorMessage = 'No Match! :(';
        }
        console.log(data)
      }catch(e){
        this.errorMessage = e.response.data.error_message;
      }finally{
        this.setLoading(false);
      }
    }
  }
}
</script>

<style lang="scss">

.search {
  background-color: #fc357e;
  background-color: #fc35a3;

  &__messages {
    position: relative;
  }

  &__error, &__loading {
    color: white;
    min-height: 6rem;
    display: grid;
    place-items: center;
    font-weight: 500;
    font-style: italic;
    text-shadow: 0px 1px 2px rgba(0,0,0, .1);
  }

  &__loading {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse .4s linear infinite alternate-reverse;
  }

  &__btn {
    cursor: pointer;
    border: none;
    outline: none;
    height: 5rem;
    padding: 0 2em;
    border-radius: 2px;
    font-family: 'AUDIOWIDE';
    width: 21.8rem;
    background-color: rgb(177, 227, 247);
    color: white;

    &:hover {
      transition: all .2s;
      background-color: darken(rgb(177, 227, 247), 5), ;
    }
  }

  &__date-box {
    text-align: center;
    margin: 0 auto;
  }

  &__date-input {
    display: inline-block;
    padding: 0rem 2rem;
    margin-right: 2rem;
    border: none;
    outline: none;
    border-radius: 2px;
    font-family: 'AUDIOWIDE';
    color: #888;
    height: 5rem;
    font-size: 1.25rem;
    max-width: 21.8rem;

    &::placeholder{
      color: #888;
    }
  }

  &__date-input, &__btn {
    box-shadow: 0px 2px 4px rgba(0,0,0, .2);

  }


  &__date-heading {
    text-align: center;
    font-family: 'Monoton', cursive;
    color: white;
    margin-bottom: 9rem;
    font-size: 3.8rem;
    position: relative;
    line-height: 1;
    word-spacing: 1rem;
    text-shadow: 0px 1px 3px rgba(0,0,0, .2);
  }

  &__date-heading{
    font-size: 3.4rem;
    margin: 4rem;     
  }

}
</style>