<template>
  <div class="find page">
    <h1 class="page__heading">Find Asteroid</h1>

    <div class="find__box">
      <input class="find__input" v-model="asteroidId" type="text"  placeholder="Asteroid Id..." @click="clearError">
      <button class="find__btn" @click="findAsteroid">find</button>
      <div class="find__messages">
        <div class="find__error">{{errorMessage}}</div>
        <div class="find__loading" v-if="isLoading">Loading...!</div>
      </div>
    </div>

    <h2 class="search__date-heading">{{data.id}}</h2>
    <div class="find__center">
      <asteroid :asteroid="data" :index="0" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {COLORS, API} from '@/constants';
import {emitNavColor} from '@/utils';
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
      isError: true,
    }
  },
  async created() {
    this.errorMessage = this.exampleMessage;
    emitNavColor('setNavColor', COLORS.FIND, this);
  },
  methods: {
    async findAsteroid(){
      if(!this.validateId()) return; 
      try {
        this.isError = false;
        this.setLoading(true);
        const {data} = await axios.get(API.ASTEROID_FIND(this.asteroidId)); 
        this.data = data;
        this.clearAsteroidIdField();
        console.log(data);
      }catch(e){
        console.log(e.response);
        this.isError = true;
        this.errorMessage = 'Asteroid with this Id doesnt not exist!';
      }finally{
         this.setLoading(false);
      }
    },
    setLoading(state){
      this.isLoading = state;
      if(this.isLoading && !this.isError) this.errorMessage = '';
      if(!this.isLoading && !this.isError) this.errorMessage = this.exampleMessage;
    },
    clearError(){
      this.errorMessage = '';
      this.errorMessage = this.exampleMessage;
    }, 
    clearAsteroidIdField(){
      this.asteroidId = '';
    }, 
    validateId(){
      const isValid = /^\d{7}$/.test(this.asteroidId);
      if(!isValid){
        this.errorMessage = 'Asteroid Id can only be numbers, 7 digits long!';
        return false;
      }
      return true;
    }
  }
}
 
</script>

<style lang="scss">

.find {
  background-color: #ffdb64;
  background-color: #6de15f;
  
 

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
    background-color: rgb(177, 227, 247);
    color: white;

    &:hover {
      transition: all .2s;
      background-color: darken(rgb(177, 227, 247), 5), ;
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
    color: #888;
    height: 5rem;
    font-size: 1.25rem;
    max-width: 21.8rem;

    &::placeholder{
      color: #888;
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