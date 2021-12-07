<template>
  <div class="App">
    <!-- Navigation -->
    <nav
      class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
    >
      <div class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="btn nav-link pr-3" to="/">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/signup"
              >Sign up</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="App">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
