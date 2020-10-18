<template>
  <div class="asteroid">

    <div class="asteroid__head" :style="{'background-image': 'url(' + require(`@/assets/a-${index % 15}.jpg`) + ')'}">
        <div class="asteroid__img-box">
          <div class="asteroid__title">
            <a :href="asteroid.nasa_jpl_url" target="_blank" class="asteroid__name">{{asteroid.name}}</a>
            <div class="asteroid__id">{{asteroid.id}}</div>
          </div>
        </div>
    </div>

    <div class="asteroid__body">
      
      <div class="asteroid__field asteroid__field--like">
        <div class="asteroid__field-left">
          <div class="asteroid__field-name">Dangerous</div>
          <div class="asteroid__field-value">{{isDangerous(asteroid)}}</div>  
        </div>
        <div class="asteroid__field-right" v-if="isLoggedIn">
          <i v-if="isLiked" class="fas fa-heart asteroid__like-icon" @click="toggleLike"></i>
          <i v-else class="far fa-heart asteroid__like-icon" @click="toggleLike"></i>
        </div>
      </div>

      <div class="asteroid__field">
        <div class="asteroid__field-name">Average Diameter</div>
        <div class="asteroid__field-value">{{getDiameter(asteroid)}} km</div>
      </div>

      <div class="asteroid__field">
        <div class="asteroid__field-name">Orbital Period</div>
        <div class="asteroid__field-value">{{getOrbitalPeriod(asteroid)}} years</div>
      </div>

      <div class="asteroid__field">
        <div class="asteroid__field-name">First Observed</div>
        <div class="asteroid__field-value">{{getFirstObservedDate(asteroid)}}</div>
      </div>

      <div class="asteroid__field">
        <div class="asteroid__field-name">Last Observed</div>
        <div class="asteroid__field-value">{{getLastObservedDate(asteroid)}}</div>
      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment';

import {auth, favoritesCollection} from '@/firebaseInit';
import fb from '@/firebaseService';

export default {
  name: 'asteriod',
  props:{
    asteroid: Object,
    index: Number,
    liked: Boolean
  },
  data(){
    return {
      isLiked: this.liked,
      isLoggedIn: false,
      lastDebounceTimer: null,
      unSubcriptions: []
    }
  },
  watch: {
    liked(){
      this.isLiked = this.liked;
    }
  },
  created(){
    const authUnsubscription = auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    });
    this.unSubcriptions.push(authUnsubscription);
  },
  beforeDestroy(){
    this.unSubcriptions.forEach(s => s());
  },
  methods: {
    isDangerous(asteroid){
      return asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No';
    },
    getDiameter(asteroid){
      const maxDiameter = asteroid.estimated_diameter.kilometers.estimated_diameter_max;
      const minDiameter = asteroid.estimated_diameter.kilometers.estimated_diameter_min;
      return ((maxDiameter + minDiameter) / 2).toFixed(2);
    },
    getFirstObservedDate(asteroid){
      const date = asteroid.orbital_data.first_observation_date;
      return moment(date).format("MMM Do, YYYY");
    },
    getLastObservedDate(asteroid){
      const date = asteroid.orbital_data.last_observation_date;
      return moment(date).format("MMM Do, YYYY");
    },
    getOrbitalPeriod(asteroid){
      return (asteroid.orbital_data.orbital_period / 365).toFixed(2);
    },
    async toggleLike(){
      this.isLiked = !this.isLiked;
      if(this.isLiked){
        fb.likeAsteroid(this.asteroid);
      }else{
        fb.unlikeAsteroid(this.asteroid.id);
      }
    },
    debounce(wait=3000){
      if(this.lastDebounceTimer) clearTimeout(this.lastDebounceTimer);
      this.lastDebounceTimer = setTimeout(()=>{
        //logic
      }, wait)
    }
  }
}
</script>

<style lang="scss">

.asteroid {
  width: 35.4rem;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);

  &__head{
    height: 27.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 2px 2px 0 0;
    backface-visibility: hidden;
  }

  &__body{
    background-color: white;
    padding: 2rem 2.6rem;
    border-radius: 0 0 2px 2px;
    backface-visibility: hidden;
  }

  &__title {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
  }

  &__name {
    color: white;
    font-size: 3rem;
    font-weight: 500;
    position: relative;
    margin-bottom: 1rem;
    text-decoration: none;
    display: block;
    backface-visibility: hidden;

    &::after {
      position: absolute;
      content: '';
      display: inline-block;
      height: .1rem;
      background-color: white;
      width: 60%;
      bottom: -.1rem;
      left : 0;
    }

    &:hover {
      transition: all .3s;
      font-size: 3.06rem;
      color: darken(white, 3);
    }
  }

  &__id {
    width: fit-content;
    color: snow;
    font-style: italic;
    font-weight: 400;
    font-family: 'audiowide';
    letter-spacing: 1px;
    font-size: 1.48rem;
  }

  &__field {
    margin-bottom: .6rem;
    
    &--like {
      display: flex;
      justify-content: space-between;
    }
  }

  &__like-icon {
    font-size: 1.71rem;
    cursor: pointer;
    color: #474747;
    
    &:hover{
      transform-origin: all .3s;
      color: #636363;
    }
  }

  &__field-name {
    color: #333;
    font-weight: 500;
    position: relative;
    display: inline-block;
    font-size: 1.4rem;
    margin-bottom: .5rem;

    &::after {
      position: absolute;
      content: '';
      display: inline-block;
      height: .1rem;
      background-color: #666;
      width: 100%;
      bottom: -.3rem;
      left : 0;
    }
  }

  &__field-value {
    color: #999;
    padding-left: 1.2rem;
    font-size: 1.48rem;
  }

}
</style>
