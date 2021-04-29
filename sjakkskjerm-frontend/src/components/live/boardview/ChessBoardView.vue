<template>
  <div class="chessboardview">
    <p v-if="playersSet" class="whiteplayer">{{ whitePlayer }}</p>
    <ChessBoard ref="board" :class="{ active: gameFinished }" fen="start" />
    <p v-if="playersSet" class="blackplayer">{{ blackPlayer }}</p>
    <p v-if="gamesPresent == false">Waiting for moves</p>
    <p v-if="gameFinished">Game over - {{ result }}</p>
    <pre> Trekk: {{ pgn.pop() }}</pre>
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
      console.log("FetchBoardPgn: fetching pgn...");
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
          console.log(
            "FetchBoardPGN: Error - Unable to set PGN for board: " + this.gameId
          );
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
.chessboardview {
  width: 400px;
  padding: 0.5rem;
  margin: 0.1rem;
}

.active {
  opacity: 0.5;
}

.whiteplayer {
  text-align: left;
}

.blackplayer {
  text-align: right;
}


</style>
