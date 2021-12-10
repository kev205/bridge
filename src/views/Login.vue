<template>
  <div class="auth-template">
    <form>
      <h3>Sign In</h3>

      <div class="form-group">
        <label>Email address</label>
        <v-text-field
          v-model="email"
          required
          class="input-field"
        ></v-text-field>
      </div>

      <div class="form-group">
        <label>Password</label>
        <v-text-field
          v-model="password"
          required
          class="input-field"
          type="password"
        ></v-text-field>
      </div>
      <v-btn
        class="mr-4 form-btn"
        @click="submit"
        style="color: white; background-color: black"
      >
        Sign in
      </v-btn>
      <p class="forgot-password text-right">
        Not a member
        <router-link :to="{ name: 'signup' }">sign up?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { userServices } from "../services/user.services";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    userServices.logout();
    localStorage.clear();
  },
  methods: {
    submit() {
      userServices.login(this.email, this.password).then((user) => {
        localStorage.setItem("user", JSON.stringify(user.user));
        window.location.href = "/products";
      });
    },
  },
};
</script>
