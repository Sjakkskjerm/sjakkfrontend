<template>
  <div>
    <h1>Profil</h1>
    <div>Brukernavn: {{gettersAuthData.userid}}</div>
    <div>Bruker ID: {{gettersAuthData.uid}}</div>
    <div>Roller: {{gettersAuthData.role}}</div>
    <br>
    <button @click="$router.push('/admin/sendmessage')" 
    v-if="isOrganizerPlus"
    class="btn btn-primary">Send Melding</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from "../../store/index";

export default {
  computed: {
    ...mapGetters('auth', {
      gettersAuthData:'getAuthData'
    }),
    isOrganizerPlus() {
        return store.getters["auth/isOrgPlus"];
    }
  }
}
</script>

<style>

</style>