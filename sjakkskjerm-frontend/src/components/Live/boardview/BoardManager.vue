<template>
  <div v-if="gamesFectched" class="boardmanager">
    <!-- <div v-for="game in games" :key="game">
    </div> -->
    <chess-board-view
      v-for="game in games"
      :key="game"
      :game-id="game"
    ></chess-board-view>
  </div>
</template>

<script>
import ChessBoardView from "@/components/live/boardview/ChessBoardView.vue";
import GameService from "@/services/GameService.js";

export default {
  //Author: Martin Håhjem Årdal
  //Adds as many ChessBoardView components as there are games
  //being played on digital chess boards in a tournament.
  //Takes in tournamentId as a prop. TournamentId will be used to fetch the
  //number of games of being played on digital chess boards in that tournament.
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
      gamesFectched: false
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
          console.log(
            "FetchGames: Error - Unable to retrieve games for tournament " +
              this.tournamentId
          );
          console.log(error);
        });
    }
  }
};
</script>
