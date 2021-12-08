<template>
  <div class="auth-template">
    <form>
      <h3>Sign Up</h3>

      <div class="form-group">
        <label>Full Name*</label>
        <v-text-field
          v-model="fullname"
          :error-messages="fullnameErrors"
          required
          class="input-field"
        ></v-text-field>
      </div>

      <div class="form-group">
        <label>Email address*</label>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          required
          class="input-field"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
      </div>

      <div class="form-group">
        <label>Password*</label>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
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
        Sign up
      </v-btn>
      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'login' }">sign in?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { userServices } from "../services/user.services";

export default {
  mixins: [validationMixin],
  validations: {
    fullname: { required, minLength: minLength(10) },
    password: { required, minLength: minLength(6) },
    email: { required },
  },
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  mounted() {
    userServices.logout();
  },
  computed: {
    fullnameErrors() {
      const errors = [];
      if (!this.$v.fullname.$dirty) return errors;
      !this.$v.fullname.minLength &&
        errors.push("Full name must be at least 10 characters long");
      !this.$v.fullname.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.minLength && errors.push("email must be given");
      !this.$v.email.required && errors.push("email is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("password must be given");
      !this.$v.password.required && errors.push("password is required.");
      return errors;
    },
  },
  methods: {
    submit() {
      userServices
        .createUser(this.email, this.password, {
          displayName: this.fullname,
        })
        .then(() => {
          localStorage.setItem(
            "user",
            JSON.stringify({ email: this.email, displayName: this.fullname })
          );
          this.$router.replace({
            name: "products",
          });
        });
    },
  },
};
</script>
