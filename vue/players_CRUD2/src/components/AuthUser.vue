<!-- 

  
  Student instructions to create this component:

  The functionality of this component is two fold: 
  1. Display a link that toggles between "Go to login", "Go to register", and "Logout" depending on the value of the isLoggedIn prop: By default, it is "Go to register", when the user is not logged in.  
  - User logged in: display "Logout". The link should emit a logout event when clicked.
  - User not logged in and in login: display "Go to register". 
  - User not logged in and in register: display "Go to login".
  
  2. When user is trying to log in or register, the component should display a form with two input fields and a submit button.  The form should have an id of "auth-form". The form should submit the username and password to the submit function when submitted. The input fields should be required.

  - One input field for username with an id of "username", name of "auth-username" and type of "text".
  - One input field for password with an id of "password", name of "auth-password" and type of "password".
  - A submit button with a class of "btn-auth" with the text "login" or "register" depending on the current state of the component. If the user is trying to login, the button should say "login" and emit a "login" event with the username and password. If the user is trying to register, the button should say "register" and emit a "register" event with the username and password.

  Once user is logged in or registered, the form should be hidden and the link should change to "Logout".

 -->

<script setup>
import { reactive, ref, watchEffect } from "vue";

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
  },
});
const state = reactive({
  isLoggedIn: props.isLoggedIn,
  displayLogin: true,
});
const username = ref("")
const password = ref("")
const emit = defineEmits(["logout", "login", "register"]);

watchEffect(() => {
  state.isLoggedIn = props.isLoggedIn;
});

const authLinkToggle = () => {
  if (state.isLoggedIn) {
    emit("logout");
  } else {
    state.displayLogin = !state.displayLogin;
  }
};

const formSubmitHandler = () => {
  const emitAction = state.displayLogin ? "login" : "register";
  emit(emitAction, { username: username.value, password: password.value });
  username.value = ""
  password.value = ""
};

</script>

<template>
  <div>
    <a @click="authLinkToggle">{{
      state.isLoggedIn
        ? "Logout"
        : state.displayLogin
        ? "Go to register"
        : "Go to login"
    }}</a>
  </div>

  <form
    v-if="!state.isLoggedIn"
    id="auth-form"
    @submit.prevent="formSubmitHandler"
  >
    <input
      v-model="username"
      type="text"
      id="username"
      name="auth-username"
      placeholder="Username"
      required
    />

    <input
      v-model="password"
      type="password"
      id="password"
      name="auth-password"
      placeholder="Password"
      required
    />

    <button class="btn-auth" type="submit">
      {{ state.displayLogin ? "Login" : "Register" }}
    </button>
  </form>
</template>
