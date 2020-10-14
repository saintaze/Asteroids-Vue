<template>
  <div class="asteroid">

    <div class="asteroid__head" :style="{'background-image': 'url(' + require(`@/assets/a-${index}.jpg`) + ')'}">
        <div class="asteroid__img-box">
          <div class="asteroid__title">
            <a :href="asteroid.nasa_jpl_url" target="_blank" class="asteroid__name">{{asteroid.name}}</a>
            <div class="asteroid__id">{{asteroid.id}}</div>
          </div>
        </div>
    </div>

    <div class="asteroid__body">
      
      <div class="asteroid__field">
        <div class="asteroid__field-name">Dangerous</div>
        <div class="asteroid__field-value">{{isDangerous(asteroid)}}</div>
      </div>

      <div class="asteroid__field">
        <div class="asteroid__field-name">Diameter</div>
        <div class="asteroid__field-value">{{getDiameter(asteroid)}} km</div>
      </div>

        <!-- <div class="asteroid__field">
        <div class="asteroid__field-name">Absolute Magnitude</div>
        <div class="asteroid__field-value">{{asteroid.absolute_magnitude_h}}</div>
      </div> -->

        <div class="asteroid__field">
        <div class="asteroid__field-name">Orbital Period</div>
        <div class="asteroid__field-value">{{getOrbitalPeriod(asteroid)}} years</div>
      </div>

      <div class="asteroid__field">
        <div class="asteroid__field-name">First Observed</div>
        <div class="asteroid__field-value">{{getFirstObservedDate(asteroid)}}</div>
      </div>

        <!-- <div class="asteroid__field">
        <div class="asteroid__field-name">Last Observed</div>
        <div class="asteroid__field-value">{{getLastObservedDate(asteroid)}}</div>
      </div> -->

    </div>

  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'asteriod',
  props:{
    asteroid: Object,
    index: Number
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
    }
  }
}
</script>


<style lang="scss">

.asteroid {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover {
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    transform: scale(1.02);
  }


  &__head{
    height: 27rem;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 2px 2px 0 0;
    backface-visibility: hidden;
    // background-color: skyblue;
    // background-image: url('~@/assets/a-1.jpg');
    // background-color: orange;
    // background-blend-mode: multiply;
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
    mix-blend-mode: hard-light;

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
      color: darken(white, 3);
    }
  }

  &__id {
    color: cornsilk;
  }

  &__field {

    // &:not(:last-child){
      margin-bottom: .6rem;

    // }
  }

  &__field-name {
    color: #4c4c4c;
    // color: #ad404b;
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
    color: #fc6035;

    padding-left: 1.2rem;
    font-size: 1.5rem;
  }

}
</style>