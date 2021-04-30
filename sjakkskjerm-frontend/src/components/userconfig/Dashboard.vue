<template>
  <div>
    <h1>Profil</h1>
    <hr>
    <div>Brukernavn: {{gettersAuthData.userid}}</div>
    <div>Bruker ID: {{gettersAuthData.uid}}</div>
    <div>Roller: {{gettersAuthData.role}}</div>
    <br>
    <div>
      <TournamentList :tournaments="tournaments" title="Mine Turneringer" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameService from '@/services/GameService.js';
import TournamentList from '@/components/tournaments/TournamentList.vue';

export default {
  name: "Profile",
  components: {
    TournamentList
  },
  data() {
    return {
      tournaments: []
    };
  },
  computed: {
    ...mapGetters('auth', {
      gettersAuthData:'getAuthData'
    })
  },
  mounted() {
    this.getTournamentsByOwner();
  },
  methods: {
    getTournamentsByOwner() {
      GameService.getTournamentsByOwner(this.gettersAuthData.uid)
        .then(response => {
          console.log(response);
          this.tournaments = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style>

</style>