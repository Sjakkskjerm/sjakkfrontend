<template>
  <div>
    <h1>Profil</h1>
    <div>Brukernavn: {{gettersAuthData.userid}}</div>
    <div>Bruker ID: {{gettersAuthData.uid}}</div>
    <div>Roller: {{gettersAuthData.role[0].authority}}</div>
    <br>
    <button @click="$router.push('/admin/sendmessage')" 
    v-if="gettersAuthData.role[0].authority === 'ROLE_ORGANIZER'"
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