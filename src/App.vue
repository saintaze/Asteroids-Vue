<template>
  <div class="app">
    <site-nav :navColor="navColor" />
    <router-view @setNavColor="setNavColor"/>
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav';

export default {
  name: 'app',
  components : {
    SiteNav
  },
  data(){
    return {
      navColor: '#333'
    }
  },
  methods: {
    setNavColor(color){
      this.navColor = color;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Monoton&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;

  @media (max-width: 1260px) {
    font-size: 60%;
  }
  @media (max-width: 1100px) {
    font-size: 58%;
  }
  @media (max-width: 950px) {
    font-size: 56%;
  }
  @media (max-width: 700px) {
    font-size: 55%;
  }
  @media (max-width: 500px) {
    font-size: 54%;
  }
  @media (max-width: 380px) {
    font-size: 50%;
  }
  @media (max-width: 320px) {
    font-size: 45%;
  }
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  line-height: 1.6;
  color: #2c3e50;
  font-weight: normal;
}

.page {
  padding: 0 0 9rem;
  min-height: 100vh;

  &__heading {
    text-align: center;
    font-family: 'Monoton', cursive;
    color: white;
    margin-bottom: 9rem;
    font-size: 3.8rem;
    position: relative;
    line-height: 1;
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
    word-spacing: 1.2rem;

    @media (max-width: 800px) {
      margin-bottom: 7rem;
      padding-top: 2rem;
      max-width: 33rem;
      margin: 0 auto 7rem;
      line-height: 1.1;
    }

    @media (max-width: 500px) {
      margin-bottom: 6rem;
    }

  }

  &__center {
    max-width: 114rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 7rem 4rem;
    margin: 0 auto;

    @media (max-width: 1260px) {
      grid-gap: 5rem 3rem;
    }

    @media screen and (max-width: 1180px){
      grid-template-columns: repeat(2, 1fr);
      max-width: 75rem;
    }

    @media screen and (max-width: 800px){
      grid-template-columns: repeat(1, 1fr);
      max-width: 35rem;
      grid-gap: 4.4rem 3rem;
    }
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


@keyframes wobble {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}

</style>
