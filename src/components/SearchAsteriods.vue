<template>
  <div class="search">
    <h1 class="search__heading">Search Asteroid</h1>

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
      <h2 class="search__date-heading">{{key | dateFormat}}</h2>
      <div class="search__center">
        <asteroid v-for="(asteroid, index) in data[key]" :key="asteroid.id" :asteroid="asteroid" :index="index"/>
      </div>
    </div> 
  </div>
</template>

<script>
import {API_ENDPOINT__ASTEROIDS_DATE, COLORS} from '@/constants';
import axios from 'axios';
import moment from 'moment';
import {searchData} from '@/data';
import Asteroid from '@/components/Asteroid';
import {emitNavColor} from '@/utils';


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
  computed: {
    
  },
  filters: {
    dateFormat(dateStr) {
      return moment(dateStr).format("MMM Do, YYYY");
    }
  },
  created(){
    emitNavColor('setNavColor',COLORS.SEARCH, this);
  },
  methods: {
    markDateInput(e){
      e.target.type = 'date';
      this.clearErrorMessage();
    },
    clearErrorMessage(){
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
      this.setLoading(true);
      const dateParams = `start_date=${this.startDate}&end_date=${this.endDate}`;
      try {
        const {data} = await axios.get(`${API_ENDPOINT__ASTEROIDS_DATE}&${dateParams}`);
        this.data = data.near_earth_objects;
        this.clearDateFields();
        if(!Object.keys(this.data).length){
          this.errorMessage = 'No Match! :(';
        }
        console.log(data)
      }catch(e){
        this.errorMessage = e.response.data.error_message
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
    min-height: 100vh;
    padding: 9rem 0;

    &__list {

    }

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
      // border: 1px solid pink;
    }


    &__heading, &__date-heading {
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

    @keyframes pulse {
      0%{
        transform: scale(.98) translate(-50%, -50%);
      }
      50%{
        transform: scale(1) translate(-50%, -50%);
      }
      100%{
        transform: scale(1.02) translate(-50%, -50%);
      }
    }


  }
</style>