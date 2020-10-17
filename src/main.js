import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from "vuelidate";
import {auth} from './firebaseInit';

Vue.use(Vuelidate);

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
