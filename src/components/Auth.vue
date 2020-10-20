<template>
  <div class="auth">
    <div class="auth__center">
      <form class="form" @submit.prevent="formSubmit">
        <div class="form__header">
          <img
            src="@/assets/s-4.png"
            alt="logo"
            class="form__logo"
          />
          <h2 class="form__heading" v-if="isSigninForm">Sign In</h2>
          <h2 class="form__heading" v-else>Sign Up</h2>
        </div>

        <!-- Email -->
        <div
          class="form__group"
          :class="{ 'form__group--error': $v.data.email.$error }"
        >
          <input
            type="text"
            class="form__input"
            v-model.trim="data.email"
            @input="validateEmail"
            placeholder="Enter Email"
          />
          <i class="form__icon far fa-envelope"></i>
        </div>
        <div class="form__errors">
          <div class="form__error" v-if="!$v.data.email.required">
            Email is required
          </div>
          <div class="form__error" v-if="!$v.data.email.email">
            Email must be valid
          </div>
        </div>

        <!-- Password -->
        <div
          class="form__group"
          :class="{ 'form__group--error': $v.data.password.$error }"
        >
          <input
            type="password"
            class="form__input"
            v-model.trim="data.password"
            @input="validatePassword"
            placeholder="Enter Password"
          />
          <i class="form__icon fas fa-eye form__icon"></i>
        </div>
        <div class="form__errors">
          <div class="form__error" v-if="!$v.data.password.required">
            Password is required
          </div>
          <div class="form__error" v-if="!$v.data.password.minLength">
            Password must have atleast 6 characters
          </div>
        </div>

        <div class="form__auth">
          <span v-if="isSigninForm" class="form__auth-type">
            New to Space Quest? 
            <span class="form__auth-type-link" @click="setFormType('signup')">Sign Up</span>
          </span>
          <span v-else class="form__auth-type">
            Already have an account?
            <span class="form__auth-type-link" @click="setFormType('signin')">Sign In</span>
          </span>
          <input class="form__submit" type="submit" value="Sign In" v-if="isSigninForm"/>
          <input class="form__submit" type="submit" value="Sign Up" v-else />
         
        </div>
      </form>

      <div v-if="error" class="form__info">
        <div>{{error.code}}</div>
        <div>{{error.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import { required, email, minLength } from "vuelidate/lib/validators";
import {emitNavColor} from '@/utils';
import {COLORS} from '@/constants';
import fb from '@/firebaseService';


export default {
  name: "auth",
  data: () => ({
    formType: 'signin',
    error: null,
    data: {
      email: "",
      password: "",
    },
  }),
  validations: {
    data: {
      password: {
        required,
        minLength: minLength(6)
      },
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    isSigninForm(){
      return this.formType === 'signin';
    }
  },
  watch:{
    $route(to, from){
      this.formType = to.params.type;
    }
  },
  created(){
   emitNavColor('setNavColor', COLORS.AUTH, this);
   this.formType = this.$router.currentRoute.params.type;
  },
  methods: {
    async formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.error = null;
        try {
          if(this.isSigninForm){
            await fb.signin(this.data);
          }else{
            fb.signup(this.data);
          }
        }catch(e){
          this.error = e; 
        }
        if(!this.error){
          this.$router.push({name: 'asteroids'});
        }
      }
    },
    validatePassword(value) {
      this.$v.data.password.$touch();
    },
    validateEmail(value) {
      this.$v.data.email.$touch();
    },
    setFormType(type){
      this.formType = type;
      this.$router.replace({path: `/auth/${this.formType}`});
    }
  },
};
</script>


<style lang="scss">

// Variables
$color-white: #fafafa;
$color-grey-light-0: #d3d3d3;
$color-grey-light-1: #cecece;
$color-grey-light-2: #e7e7e7;
$color-red-dark-1: #f04124;
$color-red-light-1: salmon;
$color-red-light-2: #f79483;
$color-red-light-3: #f57f6c;
$color-grey-dark-1: #282426;
$color-grey-dark-2: #505050;
$color-blue-dark: #3546a1;

// auth Wrapper
.auth {
  min-height: calc(100vh - 88px);
  // background-color: #9c1dfc;
  // background-color: #ffdb64;
  // background-color: #9031ea;
  // background-color: #ffed64;
  background-color: #962cfa;

  &__center {
    height: 40.6rem;
    background-color: white;
    width: 32rem;
    padding: 3rem;
    border: 1px solid #f7f7f7;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    @media (max-width: 500px) {
      padding: 2.6rem 2rem;
    }
  }
}
// Form
.form {

  &__group {
    margin-bottom: 2rem;
    position: relative;
    &--error {
      animation: wobble 0.6s ease-in-out forwards;
    }
    &--error .form__label {
      color: $color-red-dark-1;
      transition: all 0.2s ease-in-out;
    }
    &--error .form__input {
      border-color: $color-red-light-2;
      transition: all 0.2s ease-in-out;
    }
    &--error .form__icon {
      color: $color-red-light-1;
      transition: all 0.2s ease-in-out;
    }
    &--error + .form__errors {
      opacity: 1;
      transition: all 0.2s ease-in-out;
    }
  }

  &__input {
    position: relative;
    outline: none;
    width: 100%;
    background-color: inherit;
    border: 1px solid $color-grey-light-2;
    padding: 1.3rem 1.3rem;
    padding-right: 4.3rem;
    font-size: 1.32rem;
    color: $color-grey-dark-2;
    border-radius: 3px;
    font-family: inherit;
    transition: border 0.2s ease-in-out;
    box-sizing: border-box;
    &::placeholder {
      color: $color-grey-light-1;
      font-family: inherit;
      font-size: 1.2rem;
    }
  }

  &__icon {
    position: absolute;
    display: inline-block;
    right: 2rem;
    top: 1.8rem;
    font-size: 1.5rem;
    color: $color-grey-light-0;
  }

  &__errors {
    opacity: 0;
    margin-top: -1.7rem;
    min-height: 2.4rem;
  }

  &__error {
    line-height: 1.4;
    height: 100%;
    margin-left: 1.4rem;
    color: $color-red-light-3;
    font-size: 1.13rem;
    transition: all 2s ease-in-out;
  }

  &__auth {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0 1.8rem;
  }

  &__submit {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: 1.3rem;
    color: $color-white;
    height: 3.5rem;
    line-height: 3.5rem;
    padding: 0 1.6rem;
    border: none;
    border-radius: 3.5px;
    outline: none;
    transition: all 0.2s ease-in-out;
    // background-color: darken(#5aa096, 6);
    // background-color: #334d5cfa;
    background-color: #466c6f;
    
    &:hover {
      background-color: darken(#466c6f, 4);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    margin: 1.2rem 0 3.9rem;
  }

  &__heading {
    color: $color-grey-dark-1;
    margin: 0;
    font-family: 'audiowide';
    font-weight: 300;
  }

  &__logo {
    width: 7rem;
    margin-right: .9rem;
  }

  &__link {
    color: $color-blue-dark;
    text-decoration: none;
    font-size: 1.3rem;

    &:hover {
      color: darken($color: $color-blue-dark, $amount: 11);
    }
  }

  &__info {
    width: 100%;
    position: absolute;
    bottom: -8.3rem;
    left: 0;
    text-align: center;
    font-size: 1.26rem;
    color: white;
    font-style: italic;
    text-shadow: 0px 1px 2px rgba(0,0,0, .1);

  }

  &__auth-type{
    font-size: 1.2rem;
  }

  &__auth-type-link{
    cursor: pointer;
    color: #fc7143;
    font-weight: 500;
    font-size: 1.3rem;
    display: block;

    &:hover {
      color: darken(#fc7143, 6);
    }
  }
}

</style>

