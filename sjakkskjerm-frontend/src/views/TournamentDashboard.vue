<template>
  <div v-if="gettersAuthData.role === 'ROLE_ORGANIZER' && ownerOfTournament">
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
      <br />
      <button class="tilbakeknapp btn btn-outline-dark" @click="$router.go(-1)">
        Tilbake
      </button>
    </div>
  </div>
  <div v-if="gettersAuthData.role !== 'ROLE_ORGANIZER'">
    <hr />
    <h2>Du er ikke autorisert for denne tjenesten!</h2>
    <button class="tilbakeknapp btn btn-outline-dark" @click="$router.go(-1)">
      Tilbake
    </button>
  </div>
  <div v-if="!ownerOfTournament">
    <hr />
    <h2>Du er ikke arrangør for denne turneringen!</h2>
    <button class="tilbakeknapp btn btn-outline-dark" @click="$router.go(-1)">
      Tilbake
    </button>
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import AuthoService from "@/services/AuthoService.js";
import DashboardMessage from "@/components/dashboard/DashboardMessage.vue";
import { mapGetters } from "vuex";

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
    },
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    })
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
          if (error.response.status == 404) {
            this.$router.push({ name: "NotFound" });
          }
          console.log(error);
        });
    },
    deleteTournament() {
      const deleteTournamentURL = "/tournaments/delete?tournamentid=" + this.id;
      AuthoService.delete(deleteTournamentURL)
        .then(() => {
          this.$router.go(-1);
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
