<template>
  <div v-if="error == false" class="boardmanager">
    <div v-if="gamesFectched" class="boards">
      <div v-if="hasGames">
        <ChessBoardView
          v-for="game in games"
          :key="game"
          class="board"
          :game-id="game"
        />
      </div>
      <div v-else>
        <p>{{ noGamesText }}</p>
      </div>
    </div>
    <div v-else-if="gamesFectched == false" class="load-board-text">
      <p>{{ fetchText }}</p>
    </div>
  </div>
  <div v-else-if="error" class="error-text-boardmanager">
    <p>{{ errorUserFeedbackText }}</p>
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
      default: "124" //default value for development.
    }
  },
  data: function() {
    return {
      games: [],
      gamesFectched: false,
      fetchText: "Fetching games..",
      noGamesText: "Tournament " + this.tournamentId + " has no games.",
      error: false,
      errorUserFeedbackText: "Error Occured: "
    };
  },
  computed: {
    hasGames() {
      return this.games.length > 0;
    }
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
          this.userFeedbackText = "Tournament has no games";
          console.log("FetchGames: Succesfully fetched games");
        })
        .catch(error => {
          this.error = true;
          this.errorHandler(error);
        });
    },
    errorHandler(error) {
      console.log(
        "FetchGames: Error - Unable to retrieve games for tournament " +
          this.tournamentId
      );
      if (error.response) {
        if (error.response.status == 404) {
          this.errorUserFeedbackText +=
            "Tournament " + this.tournamentId + " does not exist.";
        } else if (error.response.status == 500) {
          this.errorUserFeedbackText +=
            "Sjakkskjerm server is down. We are unable to give a recovery time estimate.";
        } else if (error.response.status == 503) {
          //Axios Error does not support accessing Retry-After header field. Can't easily give estimate.
          this.errorUserFeedbackText +=
            "Sjakkskjerm server is unresponsive. Try again in a few minutes.";
        } else {
          this.errorUserFeedbackText +=
            "Unrecoverable error. We done did something stupid, sry. Please try at another time.";
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      } else if (error.request) {
        //There may be other errors. Hard to assess.
        this.errorUserFeedbackText +=
          "Unable to connect to server. There may be an issue with your internet connection.";
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }
};
</script>

<style scoped>
.boards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
