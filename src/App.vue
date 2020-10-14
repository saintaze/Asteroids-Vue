<template>
  <div class="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap');

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


.app {
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
