<template>
  <div>
    <h1>Profil</h1>
    <hr>
    <div>Brukernavn: {{gettersAuthData.userid}}</div>
    <div>Bruker ID: {{gettersAuthData.uid}}</div>
    <div>Roller: {{gettersAuthData.role}}</div>
    <br>
    <button @click="$router.push('/admin/sendmessage')" 
    v-if="gettersAuthData.role === 'ROLE_ORGANIZER'"
    class="btn btn-primary">Send Melding</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', {
      gettersAuthData:'getAuthData'
    }),
    ...mapGetters('auth', {
      gettersAuthRole: 'isOrgPlus'
    })
  }
}
</script>

<style>

</style>