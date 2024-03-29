<template>
  <div v-if="error == false" class="boardmanager">
    <div v-if="gamesFectched">
      <div v-if="hasGames" class="boards">
        <ChessBoardView
          v-for="game in games"
          :key="game"
          class="chessboardview"
          :game-id="game.id"
        />
      </div>
      <div v-else>
        <p class="error-text">{{ noGamesText }}</p>
      </div>
    </div>
    <div v-else-if="gamesFectched == false" class="load-board-text">
      <p>{{ fetchText }}</p>
    </div>
  </div>
  <div v-else-if="error" class="error-text-container">
    <p class="error-text">{{ errorUserFeedbackText }}</p>
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
      noGamesText: "Turneringen har ingen pågående spill.",
      error: false,
      errorUserFeedbackText: "En feil intraff: "
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
      GameService.getGames(this.tournamentId)
        .then(response => {
          if (Array.isArray(response.data)) {
            this.games = response.data;
            this.gamesFectched = true;
            this.errorUserFeedbackText = "Turneringen har ingen pågående spill";
          } else {
            this.error = true;
            this.errorUserFeedbackText += "We done fucked up, sry";
          }
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
          this.errorUserFeedbackText += "Turneringen ekisterer ikke.";
        } else if (error.response.status == 500) {
          this.errorUserFeedbackText +=
            "Sjakkskjerm serveren er nede. Vi kan ikke gi noen tid for når den er oppe igjen.";
        } else if (error.response.status == 503) {
          //Axios Error does not support accessing Retry-After header field. Can't easily give estimate.
          this.errorUserFeedbackText +=
            "Sjakkskjerm server svarer ikke. Prøv igjen om noen minutter.";
        } else {
          this.errorUserFeedbackText +=
            "Vi har møtt på en feil vi ikke kan fikse her og nå. Vi ha gjort noe dumt, beklager. Prøv igjen en annen tid.";
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      } else if (error.request) {
        //There may be other errors. Hard to assess from error.request.
        this.errorUserFeedbackText +=
          "Kan ikke koble til serveren. Det kan være en feil med din internettkobling.";
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
.boardmanager {
  height: 96vh;
}

.boards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.error-text-container {
  text-align: center;
  position: relative;
}

.error-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e4e4e4;
  padding: 2rem;
}
.chessboardview {
  width: 400px;
  margin: 0.1rem;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1024px) {
  .chessboardview {
    width: 275px;
  }
}

@media (min-width: 1024px) {
  .chessboardview {
    width: 300px;
  }
}

@media (min-width: 1200px) {
  .chessboardview {
    width: 315px;
  }
}
@media (min-width: 1350px) {
  .chessboardview {
    width: 350px;
  }
}

@media (min-width: 1520px) {
  .chessboardview {
    width: 400px;
  }
}
</style>
