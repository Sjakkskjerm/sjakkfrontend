<template>
  <div v-if="error == false" class="boardmanager">
    <div v-if="gamesFectched" class="boards">
      <ChessBoardView v-for="game in games" :key="game" :game-id="game" />
    </div>
    <div v-else-if="gamesFectched == false">
      <p>{{ loadText }}</p>
    </div>
  </div>
  <div v-else-if="error">
    <p>{{ errorDisplayText }}</p>
  </div>
</template>

<script>
/*
    Author: Martin Håhjem Årdal
    Adds as many ChessBoardView components as there are games
    being played on digital chess boards in a tournament.
    Takes in tournamentId as a prop. TournamentId will be used to fetch the
    number of games of being played on digital chess boards in that tournament.
*/
import ChessBoardView from "@/components/live/boardview/ChessBoardView.vue";
import GameService from "@/services/GameService.js";

export default {
  name: "BoardManager",
  components: {
    ChessBoardView
  },
  props: {
    tournamentId: {
      type: String,
      required: true,
      default: "123" //default value for development.
    }
  },
  data: function() {
    return {
      games: [],
      gamesFectched: false,
      loadText: "Fetching games...",
      error: false,
      errorDisplayText: ""
    };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    fetchGames() {
      console.log(
        "FetchGames: Fetching games for tournament " + this.tournamentId
      );
      GameService.getGames(this.tournamentId)
        .then(response => {
          this.games = response.data.games;
          this.gamesFectched = true;
          console.log("FetchGames: Succesfully fetched games");
        })
        .catch(error => {
          this.error = true;
          console.log(
            "FetchGames: Error - Unable to retrieve games for tournament " +
              this.tournamentId
          );
          if (error.response) {
            if (error.response.status == 400) {
              this.errorDisplayText = "Bad Request";
            } else if (error.response.status == 403) {
              this.errorDisplayText = "Forbidden";
            } else if (error.response.status == 404) {
              this.errorDisplayText =
                "Tournament " + this.tournamentId + " does not exist.";
            } else if (error.response.status == 500) {
              this.errorDisplayText = "Server error.";
            }
          } else if (error.request) {
            this.errorDisplayText = "Network Error";
          } else {
            console.log(error);
          }
        });
    }
  }
};
</script>
