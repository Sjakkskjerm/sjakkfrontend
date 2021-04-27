<template>
  <div>
    <h1>Dashboard</h1>
    <p>{{ tournament.tournamentName }}</p>
    <!-- <button @click="$router.push('/admin/sendmessage')" 
    v-if="gettersAuthData.role === 'ROLE_ORGANIZER'"
    class="btn btn-primary">Send Melding</button> -->
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";

export default {
  name: "TournamentDashboard",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tournament: ""
    };
  },
  mounted() {
    this.fetchTournament();
  },
  methods: {
    fetchTournament() {
      GameService.getTournament(this.id)
        .then(repsonse => {
          this.tournament = repsonse.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
