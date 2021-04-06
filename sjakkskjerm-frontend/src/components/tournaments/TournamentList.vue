<template>
  <div v-if="error == false" class="tournamentlist">
    <h2>Her kommer en liste av turneringer...</h2>
    <TournamentItem
    v-for="tournament in tournaments"
    :key="tournament"
    :tournament="tournament"
    />
  </div>
  <div v-if="error" class="yeye">
    <p>"hello"</p>
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import TournamentItem from "@/components/tournaments/TournamentItem.vue";

export default {
  name: "TournamentList",
  components: {
    TournamentItem,
  },
  data() {
    return {
      error: false,
      tournaments: []
    };
  },
  mounted() {
    this.fetchTournaments();
  },
  methods: {
    fetchTournaments() {
      GameService.getTournaments()
        .then(response => {
          this.tournaments = response.data;
          console.log(this.tournaments);
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    }
  }
};
</script>
