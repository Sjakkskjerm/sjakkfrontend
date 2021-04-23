<template>
  <div id="nav">
    <router-link to="/">Turneringer | </router-link> 
    <router-link to="/about">Om | </router-link> 
    <router-link to="/profil" v-if="getLoginStatus">Profil | </router-link> 
    <router-link to="/login" v-if="!getLoginStatus">Login | </router-link> 
    <router-link to="/register" v-if="!getLoginStatus">Registrer | </router-link>
    <router-link to="/login" v-if="getLoginStatus" v-on:click="logout()">Logg ut</router-link>
  </div>
  <router-view />
</template>
<script>
//import { mapGetters } from 'vuex';
import store from "./store/index";

export default {
  computed: {
    getLoginStatus() {
        return store.getters["auth/isTokenActive"];
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      console.log("logged out");
      alert("logged out")
    }
  }
}
</script>

<style>
#app {
  font-family: Georgia, 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #ededed;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #b94242;
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
