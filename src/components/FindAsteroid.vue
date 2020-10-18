<template>
  <div class="find page">
    <h1 class="page__heading">Find Asteroid</h1>

    <div class="find__box">
      <input class="find__input" v-model="asteroidId" type="text"  placeholder="Asteroid Id..." @click="clearError">
      <button class="find__btn" @click="findAsteroid">Find</button>
      <div class="find__messages">
        <div class="find__error">{{errorMessage}}</div>
        <div class="find__loading" v-if="isLoading">Loading...!</div>
      </div>
    </div>

    <h2 class="search__date-heading">{{data.id}}</h2>
    <div class="find__center">
      <asteroid :asteroid="data" :index="randomIndex" :liked="isFavoriteId(data.id)"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import {COLORS, API} from '@/constants';
import {emitNavColor} from '@/utils';
import {favoritesCollection, auth} from '@/firebaseInit';

import Asteroid from '@/components/Asteroid';

export default {
  name: 'find',
  components: {
    Asteroid
  },
  data(){
    return {
      asteroidId: null,
      data: {},
      errorMessage: '',
      exampleMessage: 'eg. (2162038, 3729835, 2276274)',
      isLoading: false,
      isError: false,
      favorites: [],
      randomIndex: 0,
      unSubscriptions: []
    }
  },
  async created() {
    emitNavColor('setNavColor', COLORS.FIND, this);
    this.errorMessage = this.exampleMessage;
    const authUnsubscription = auth.onAuthStateChanged(user => {
      if(user) this.favoritesListener(user.uid);
    });
    this.unSubscriptions.push(authUnsubscription);
  },
  beforeDestroy(){
    this.unSubscriptions.forEach(s => s());
  },
  watch:{
    data(){
      this.randomIndex = this.randomizeIndex();
    }
  }, 
  methods: {
    async findAsteroid(){
      if(!this.isValidId() || this.asteroidId === this.data.id) return; 
      try {
        this.isError = false;
        this.setLoading(true);
        const {data} = await axios.get(API.ASTEROID_FIND(this.asteroidId)); 
        this.data = data;
        this.clearAsteroidIdInput();
      }catch(e){
        this.isError = true;
        this.errorMessage = 'Asteroid with this Id does not exist!';
      }finally{
         this.setLoading(false);
      }
    },
    setLoading(state){
      this.isLoading = state;
      if(this.isLoading && !this.isError) this.errorMessage = '';
      if(!this.isLoading && !this.isError) this.errorMessage = this.exampleMessage;
    },
    randomizeIndex(){
      return Math.floor(Math.random() * 15);
    },
    clearError(){
      this.errorMessage = '';
      this.errorMessage = this.exampleMessage;
    }, 
    clearAsteroidIdInput(){
      this.asteroidId = '';
    }, 
    isValidId(){
      const isValid = /^\d{7}$/.test(this.asteroidId);
      if(!isValid){
        this.errorMessage = 'Asteroid Id can only be numbers, 7 digits long!';
        return false;
      }
      return true;
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

.find {
  background-color: #ffdb64;
  background-color: #6de15f;
  background-color: #95d973;
  background-color: #95d973;
  background-color: #bedb39;
  
 

  &__center {
    max-width: 114rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
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

  &__box {
    text-align: center;
    margin: 0 auto;
  }

  &__input {
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
    max-width: 21.8rem;
    letter-spacing: .2px;

    &::placeholder{
      color: #aaa;
    }
  }

  &__input, &__btn {
    box-shadow: 0px 2px 3px rgba(0,0,0, .2);
  }

  &__find-heading {
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

}
  
</style>