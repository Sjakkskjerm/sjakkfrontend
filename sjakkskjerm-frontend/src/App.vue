<template>
  <div>
    <div id="nav">
      <router-link to="/">Turneringer | </router-link>
      <router-link to="/about">Om | </router-link>
      <router-link v-if="getLoginStatus" to="/profil">Profil | </router-link>
      <router-link v-if="!getLoginStatus" to="/login">Login | </router-link>
      <router-link v-if="!getLoginStatus" to="/register"
        >Registrer |
      </router-link>
      <router-link v-if="getLoginStatus" to="/login" @click="logout()"
        >Logg ut</router-link
      >
    </div>
    <router-view />
  </div>
</template>
<script>
//import { mapGetters } from 'vuex';
import store from "./store/index";

export default {
  computed: {
    getLoginStatus() {
      return store.getters["auth/isTokenActive"];
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      console.log("logged out");
      alert("logged out");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
