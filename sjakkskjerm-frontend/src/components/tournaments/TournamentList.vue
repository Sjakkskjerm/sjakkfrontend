<template>
  <div v-if="error == false" class="tournamentlist">
    <!-- <h2>Her kommer en liste av turneringer...</h2> -->
    <h1>
      Ongoing tournaments
    </h1>
    <TournamentItem
    v-for="tournament in ongoingTournaments"
    :key="tournament"
    :tournament="tournament"
    />
    <h1>
      Future tournaments
    </h1>
     <TournamentItem
    v-for="tournament in futureTournaments"
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
      tournaments: [],
      ongoingTournaments: [],
      futureTournaments: [],
      endedTournaments: [],
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
      for(let i=0; i < this.tournaments.length; i++) {
        let tournament = this.tournaments[i];
        let startDate = new Date(JSON.stringify(tournament.startDate));
        let endDate = new Date(JSON.stringify(tournament.endDate));
        if(startDate.getTime() > today.getTime()) {
          this.futureTournaments.push(tournament);
        }
        else if(startDate.getTime() <= today.getTime() && today.getTime() <= endDate.getTime()) {
          this.ongoingTournaments.push(tournament);
        }
        else {
          this.endedTournaments.push(tournament);                
        }
      }
      console.log(this.futureTournaments);
      console.log(this.ongoingTournaments);
      
    },
  }
};
</script>
