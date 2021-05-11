<template>
  <div>
    <button
      v-if="
        gettersAuthData.role === 'ROLE_ORGANIZER' ||
          gettersAuthData.role === 'ROLE_ADMIN'
      "
      class="btn btn-dark create-tournament-button"
      @click="$router.push('/createtournament')"
    >
      Opprett turnering
    </button>
    <div v-if="!error" class="tournamentlist">
      <TournamentList :tournaments="ongoingTournaments" title="Pågående" />
      <TournamentList :tournaments="futureTournaments" title="Kommende" />
      <TournamentList :tournaments="endedTournaments" title="Fullførte" />
    </div>
    <div v-if="error" class="yeye">
      <p>An error is preventing us from showing the tournaments.</p>
    </div>
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import TournamentList from "@/components/tournaments/TournamentList.vue";
import { mapGetters } from "vuex";

export default {
  name: "TournamentManager",
  components: {
    TournamentList
  },
  data() {
    return {
      error: false,
      tournaments: [],
      ongoingTournaments: [],
      futureTournaments: [],
      endedTournaments: []
    };
  },
  computed: {
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    })
  },
  mounted() {
    this.fetchTournaments();
  },

  methods: {
    fetchTournaments() {
      GameService.getTournaments()
        .then(response => {
          this.tournaments = response.data;
          this.divideTournamentsByDate();
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    },
    divideTournamentsByDate() {
      const today = new Date();
      for (let i = 0; i < this.tournaments.length; i++) {
        let tournament = this.tournaments[i];
        let startDate = new Date(tournament.startDate.toString());
        let endDate = new Date(tournament.endDate.toString());
        if (startDate.getTime() > today.getTime()) {
          this.futureTournaments.push(tournament);
        } else if (
          startDate.getTime() <= today.getTime() &&
          today.getTime() <= endDate.getTime()
        ) {
          this.ongoingTournaments.push(tournament);
        } else {
          this.endedTournaments.push(tournament);
        }
      }
    }
  }
};
</script>

<style scoped>
.create-tournament-button {
  margin-bottom: 1.5rem;
}
</style>
