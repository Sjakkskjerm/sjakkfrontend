<template>
  <div>
    <h1>Profil</h1>
    <div>Brukernavn: {{ gettersAuthData.userid }}</div>
    <div>Bruker ID: {{ gettersAuthData.uid }}</div>
    <div>Roller: {{ gettersAuthData.role }}</div>
    <br />
    <button
      v-if="loggedIn"
      class="btn btn-primary"
      @click="$router.push('/admin/sendmessage')"
    >
      Send Melding
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", {
      loggedIn: "isLoggedIn",
      gettersAuthData: "getAuthData"
    }),
    ...mapGetters("auth", {
      gettersAuthRole: "isOrgPlus"
    })
  }
};
</script>

<style></style>
