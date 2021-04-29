<template>
  <div>
    <h1>Dashboard</h1>
    <h2>{{ tournament.tournamentName }}</h2>
    <h3>Sendte meldinger</h3>
    <DashboardMessage :tournamentid="id" />
    <div v-if="ownerOfTournament" class="delete-tournament-div">
      <button
        class="btn btn-dark delete-tournament-button"
        @click="deleteTournament"
      >
        Slett turnering
      </button>
    </div>
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import AuthoService from "@/services/AuthoService.js";
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
      tournament: "",
      error: null,
      errorFeedBackText: ""
    };
  },
  computed: {
    ownerOfTournament() {
      if (this.tournament != "") {
        return (
          this.$store.state.auth.authData.uid == this.tournament.owner.userId
        );
      } else {
        return false;
      }
    }
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
    },
    deleteTournament() {
      const deleteTournamentURL =
        "/tournaments/delete/?tournamentid=" + this.id;
      AuthoService.delete(deleteTournamentURL)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          this.error = error;
          console.log(this.error);
          this.errorFeedBackText = "Kunne ikke slette turnering.";
        });
    }
  }
};
</script>
