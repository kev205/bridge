<template>
  <div class="App" data-app="app">
    <!-- Navigation -->
    <nav v-if="isLoggedIn" class="container navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
          <router-link to="/products" class="nav-item nav-link"
            >Home</router-link
          >
          <router-link to="#" class="nav-item nav-link">About</router-link>
          <router-link to="#" class="nav-link">Media</router-link>
          <router-link to="#" class="nav-link">Market place</router-link>
          <router-link to="#" class="nav-link">Networks</router-link>
          <router-link to="#" class="nav-link">Followers</router-link>
          <router-link to="/" class="nav-item nav-link">Log out</router-link>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <div class="app-body">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>
<style>
#nav {
  background: whitesmoke;
}
#nav {
  padding: 30px;
  text-align: center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: 0.5rem;
}
</style>
