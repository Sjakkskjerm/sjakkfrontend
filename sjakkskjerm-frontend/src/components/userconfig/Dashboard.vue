<template>
  <div>
    <h1>Profil</h1>
    <hr>
    <div>Brukernavn: {{gettersAuthData.userid}}</div>
    <div>Bruker ID: {{gettersAuthData.uid}}</div>
    <div>Roller: {{gettersAuthData.role}}</div>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', {
      gettersAuthData:'getAuthData'
    })
  }
}
</script>

<style>

</style>