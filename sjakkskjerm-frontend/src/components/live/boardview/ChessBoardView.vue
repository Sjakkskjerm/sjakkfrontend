<template>
  <div>
    <p v-if="playersSet" class="whiteplayer text">{{ whitePlayer }}</p>
    <ChessBoard ref="board" :class="{ active: gameFinished }" fen="start" />
    <p v-if="playersSet" class="blackplayer text">{{ blackPlayer }}</p>
    <p v-if="gamesPresent == false" class="text">Waiting for moves</p>
    <p v-if="gameFinished" class="text">Game over - {{ result }}</p>
    <p class="moves text">Trekk: {{ pgn.pop() }}</p>
  </div>
</template>

<script>
/* 
    Author: Martin Håhjem Årdal
    Asks GameService for PGN, generates FEN-String from that PGN Array and feeds it to
    ChessBoard component.
*/

import ChessBoard from "@/components/live/boardview/ChessBoard.vue";
import Chess from "chess.js";
import GameService from "@/services/GameService.js";

export default {
  name: "ChessBoardView",
  components: {
    ChessBoard
  },
  props: {
    gameId: {
      type: String,
      required: true,
      default: "123" //default value for development.
    }
  },
  data() {
    return {
      fetchInterval: 0,
      game: {},
      pgn: [],
      gamesPresent: true,
      gameFinished: false,
      whitePlayer: "",
      blackPlayer: "",
      result: ""
    };
  },
  computed: {
    playersSet() {
      return this.whitePlayer != "" && this.blackPlayer != "";
    },
    hasSeveralGames() {
      return this.numberOfGames() > 1;
    }
  },
  mounted() {
    this.game = new Chess();
    this.setBoard("start");
    this.fetchBoardPgn();
    this.startFetchInterval(4000);
  },
  unmounted() {
    clearInterval(this.fetchInterval);
  },
  methods: {
    setBoard(fen) {
      this.$refs.board.position(fen);
    },
    updateBoard() {
      let newFen = this.generateFenFromPgn();
      this.setBoard(newFen);
      this.gameFinished = this.checkIfGameOver();
      if (this.gameFinished) {
        this.determineWinner();
      }
    },
    fetchBoardPgn() {
      GameService.getPgn(this.gameId)
        .then(response => {
          if (response.data.pgn === null) {
            this.gamesPresent = false;
          } else {
            this.gamesPresent = true;
            this.pgn = response.data.pgn.lines;
            this.updateBoard();
            if (this.whitePlayer == "" || this.blackPlayer == "") {
              this.findPlayers();
              this.determineWinner();
            }
          }
        })
        .catch(error => {
          console.log(error);
          clearInterval(this.fetchInterval);
        });
    },
    generateFenFromPgn() {
      this.game.load_pgn(this.pgn.join("\n"));
      return this.game.fen();
    },
    startFetchInterval(fetchInterval) {
      this.fetchInterval = setInterval(() => {
        this.fetchBoardPgn();
      }, fetchInterval);
    },
    checkIfGameOver() {
      return this.game.game_over();
    },
    findPlayers() {
      let pgnArray = this.pgn;
      pgnArray.forEach(line => {
        if (line.startsWith("[White ")) {
          let strArr = line.split("'", 3);
          this.whitePlayer = strArr[1];
        }
        if (line.startsWith("[Black ")) {
          let strArr = line.split("'", 3);
          this.blackPlayer = strArr[1];
        }
      });
    },
    determineWinner() {
      let pgnArray = this.pgn;
      pgnArray.forEach(line => {
        if (line.startsWith("[Result ")) {
          let strArr = line.split("'", 2);
          let result = strArr[1];
          if (result == "1-0") {
            this.result = "Winner is " + this.whitePlayer;
          } else if (result == "0-1") {
            this.result = "Winner is" + this.blackPlayer;
          } else {
            this.result = "Remis";
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.active {
  opacity: 0.5;
}

.whiteplayer {
  text-align: left;
  margin-bottom: 0.9rem;
}

.blackplayer {
  text-align: right;
  margin-bottom: 0.9rem;
}

@media (min-width: 1024px) {
  .text {
    font-size: 0.8rem;
  }
}

@media (min-width: 1200px) {
  .text {
    font-size: 0.85rem;
  }
}
@media (min-width: 1350px) {
  .text {
    font-size: 0.9rem;
  }
}

@media (min-width: 1520px) {
  .text {
    font-size: 1rem;
  }
}
</style>
