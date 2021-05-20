<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link"> Turneringer </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="getLoginStatus" to="/profil" class="nav-link"
              >Profil</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="!getLoginStatus" to="/login" class="nav-link"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="!getLoginStatus" to="/register" class="nav-link"
              >Registrer</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              v-if="getLoginStatus"
              to="/login"
              class="nav-link"
              @click="logout()"
              >Logg ut</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "./store/index";

export default {
  computed: {
    getLoginStatus() {
      return store.getters["auth/isTokenActive"];
    },
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    })
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      alert("logged out");
    }
  }
};
</script>

<style>
#app {
  font-family: Georgia, "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #ededed;
}
html,
body {
  height: 100%;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #ededed;
}
.navbar {
  padding-top: 0;
  padding-bottom: 0;
}
.navbar-collapse {
  background-color: #dfdfdf;
  height: 4vh;
}

.navbar-nav {
  float: none;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.navbar-nav > li,
a {
  display: inline-block;
  float: none;
  color: black;
}

.navbar-nav .nav-item:hover .nav-link {
  color: rgb(255, 106, 47);
}

.navbar-collapse > li,
a {
  margin-left: 8px;
  margin-right: 8px;
}

nav a.router-link-active,
nav a.router-link-exact-active {
  transform: scale(1.1);
  color: #b94242 !important;
}

* {
  box-sizing: border-box;
}

body {
  overflow-y: auto;
  overflow-x: hidden;
}

::-webkit-scrollbar-track {
  border-radius: 1px;
}

::-webkit-scrollbar {
  height: 5px;
  width: 10px;
  background-color: #ededed;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}

::-webkit-scrollbar:hover {
  background-color: rgb(207, 207, 207);
}

.tilbakeknapp {
  margin-top: 5px;
}
</style>
