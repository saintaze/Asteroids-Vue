<template>
  <div class="signup">
    <div class="signup__center">
      <form class="form" @submit.prevent="formSubmit">
        <div class="form__header">
          <img
            src="@/assets/s-2.png"
            alt="logo"
            class="form__logo"
          />
          <h2 class="form__heading">Sign In</h2>
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
          <a href="#" class="form__link">Create an account</a>
          <input class="form__submit" type="submit" value="SignIn" />
         
        </div>
      </form>

      <div class="form__info">
        Ayaz Ahmed -> Calm Island Limited. Test v0.01a.
      </div>
    </div>
  </div>
</template>

<script>

import { required, email, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import {signin} from '@/firebaseService';

import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: "signin",
  data: () => ({
    formSubmitSuccess: false,
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
  methods: {
    async formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        signin(this.data);
        this.$router.replace({name: 'asteroids'})
      }
    },
    validatePassword(value) {
      this.$v.data.password.$touch();
    },
    validateEmail(value) {
      this.$v.data.email.$touch();
    },
  },
};
</script>



<style lang="scss">
// Variables
$color-white: #fafafa;
$color-grey-light-1: #ccc;
$color-grey-light-2: #ededed;
$color-red-dark-1: #f04124;
$color-red-light-1: salmon;
$color-red-light-2: #f79483;
$color-red-light-3: #f57f6c;
$color-grey-dark-1: #282426;
$color-grey-dark-2: #505050;
$color-blue-dark: #3546a1;

// Signup Wrapper
.signup {
  background-color: #1de7fc !important;
  min-height: 100vh;
  padding: 9rem 0;

  &__center {
    background-color: white;
    width: 32rem;
    padding: 3rem;
    border: 1px solid #f7f7f7;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.2);

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
    font-size: 1.4rem;
    color: $color-grey-dark-2;
    border-radius: 3px;
    font-family: inherit;
    transition: border 0.2s ease-in-out;
    box-sizing: border-box;
    &::placeholder {
      color: $color-grey-light-1;
      font-family: inherit;
      font-size: 1.3rem;
    }
  }
  &__icon {
    position: absolute;
    display: inline-block;
    right: 2rem;
    top: 1.8rem;
    font-size: 1.5rem;
    color: $color-grey-light-1;
  }
  &__errors {
    opacity: 0;
    margin-top: -1.7rem;
    min-height: 2.6rem;
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
    margin-top: 2rem;
  }
  &__submit {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: 1.3rem;
    color: $color-white;
    height: 3.5rem;
    padding: 0.7rem 1.6rem 0.8rem;
    border: none;
    border-radius: 3.5px;
    outline: none;
    transition: all 0.2s ease-in-out;
    background-color: $color-blue-dark;
    &:hover {
      background-color: lighten($color: $color-blue-dark, $amount: 11);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    margin: 2rem 0 3.9rem;
  }

  &__heading {
    font-weight: 500;
    color: $color-grey-dark-1;
    margin: 0;
  }

  &__logo {
    width: 7rem;
    margin-right: 0.5rem;
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
    bottom: -3rem;
    left: 0;
    text-align: center;
    font-size: 1.2rem;
    color: white;
  }
}

// Animations
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

