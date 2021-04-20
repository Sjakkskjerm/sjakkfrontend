<template>
  <div v-if="error == false" class="tournamentlist">
    <router-link to="/createtournament">
      <button id="createTournamentButton">
        Opprett en turnering
      </button>
    </router-link>
    <TournamentList
      :tournaments="ongoingTournaments"
      title="Pågående turneringer"
    />
    <TournamentList
      :tournaments="futureTournaments"
      title="Fremtidige turneringer"
    />
  </div>
  <div v-if="error" class="yeye">
    <p>"hei hei"</p>
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import TournamentList from "@/components/tournaments/TournamentList.vue";

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
        let startDate = new Date(JSON.stringify(tournament.startDate));
        let endDate = new Date(JSON.stringify(tournament.endDate));
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
