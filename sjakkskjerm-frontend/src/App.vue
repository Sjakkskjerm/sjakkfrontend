<template>
  <div id="nav">
    <router-link to="/">Turneringer</router-link> |
    <router-link to="/about">Om</router-link> |
    <router-link to="/live">Live</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%
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

html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
