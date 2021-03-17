<template>
  <div class="chessboardview">
    <!-- <h1>Første brett...</h1> -->
    <ChessBoard ref="board" fen="start" />
    <!-- <button @click="updateBoardState()">Test</button> -->
  </div>
</template>

<script>
import ChessBoard from "@/components/live/boardview/ChessBoard.vue";
import Chess from "chess.js";
import GameService from "@/services/GameService.js";

export default {
  name: "ChessBoardView",
  components: {
    ChessBoard
  },
  props: {
    boardIdentifier: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      boardId: "123",
      fen: null,
      game: {},
      interval: 0,
      pgn: []
    };
  },
  mounted() {
    this.game = new Chess();
    //first board position could be latest state of board. Could use setPGN.
    this.$refs.board.position("start");
    this.interval = setInterval(() => {
      this.fetchBoardPgn();
    }, 10000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    updateBoard() {
      this.game.load_pgn(this.pgn.join("\n"));
      this.fen = this.game.fen();
      this.$refs.board.position(this.fen);
    },
    fetchBoardPgn() {
      GameService.getPgn(this.boardId)
        .then(response => {
          this.pgn = response.data.pgn;
          this.updateBoard();
        })
        .catch(error => {
          console.log("Unable to set PGN for board: " + this.boardId);
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.chessboardview {
  width: 400px;
}
</style>
