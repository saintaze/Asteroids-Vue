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
        <asteroid 
          v-for="(asteroid, index) in data[key]" 
          :key="asteroid.id" 
          :asteroid="asteroid" 
          :index="index"
          :liked="isFavoriteId(asteroid.id)" />
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import {API, COLORS} from '@/constants';
import {emitNavColor} from '@/utils';
import {favoritesCollection, auth} from '@/firebaseInit';

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
      isLoading: false,
      favorites: [],
      unSubscriptions: []
    }
  },
  filters: {
    formatDate(dateStr) {
      return moment(dateStr).format("MMM Do, YYYY");
    }
  },
  created(){
    emitNavColor('setNavColor',COLORS.SEARCH, this);
    const authUnsubscription = auth.onAuthStateChanged(user => {
      if(user) this.favoritesListener(user.uid);
    });
    this.unSubscriptions.push(authUnsubscription);
  },
  beforeDestroy(){
    this.unSubscriptions.forEach(s => s())
  }, 
  methods: {
    markDateInput(e){
      e.target.type = 'date';
      this.errorMessage = '';
    },
    clearDateInput(){
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
        this.clearDateInput();
        if(!Object.keys(this.data).length){
          this.errorMessage = 'No Match! :(';
        }
      }catch(e){
        this.errorMessage = e.response.data.error_message;
      }finally{
        this.setLoading(false);
      }
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
          this.favorites = updatedFavorites
        });
      this.unSubscriptions.push(favoritesUnsbscription);
    }
  }
}
</script>

<style lang="scss">

.search {
  background-color: #fc35a3;
  // background-color: #fc35b6;

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
    background-color: #433e30;
    border: 1px solid #555;
    color: white;
    letter-spacing: .2px;

    &:hover {
      transition: all .2s;
      background-color: lighten(#555, 7) ;
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
    color: #999;
    height: 5rem;
    font-size: 1.25rem;
    width: 21.8rem;
    font-weight: 100;
    letter-spacing: .2px;

    &::placeholder{
      color: #aaa;
      font-weight: 100;
    }
  }

  &__date-input, &__btn {
    box-shadow: 0px 2px 4px rgba(0,0,0, .2);
  }

  &__date-heading {
    margin: 5rem 0;     
    text-align: center;
    font-family: 'Monoton', cursive;
    color: white;
    font-size: 3.6rem;
    position: relative;
    line-height: 1;
    word-spacing: 1rem;
    text-shadow: 0px 1px 3px rgba(0,0,0, .2);
    &:first-child{
      margin-top: 4rem;
    }
  }

}
</style>