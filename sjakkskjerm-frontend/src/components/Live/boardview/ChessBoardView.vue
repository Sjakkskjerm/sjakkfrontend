<template>
  <div class="chessboardview">
    <ChessBoard ref="board" fen="start" />
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
      type: Number,
      required: true,
      default: 123 //default value for development.
    }
  },
  data() {
    return {
      fetchInterval: 0,
      game: {},
      pgn: []
    };
  },
  mounted() {
    this.game = new Chess();
    this.setBoard("start"); //temporary for development.
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
    },
    fetchBoardPgn() {
      console.log("FetchBoardPgn: fetching pgn...");
      GameService.getPgn(this.gameId)
        .then(response => {
          this.pgn = response.data.pgn;
          this.updateBoard();
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
    }
  }
};
</script>

<style scoped>
.chessboardview {
  width: 400px;
}
</style>
