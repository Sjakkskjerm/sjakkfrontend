<template>
  <div>
    <h1>Dashboard</h1>
    <p>{{ tournament.tournamentName }}</p>
    <DashboardMessage :tournamentid="id" />
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import DashboardMessage from "@/components/dashboard/DashboardMessage.vue";

export default {
  name: "TournamentDashboard",
  components: {
    DashboardMessage
  },
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
