<template>
  <div class="chessboardview">
    <!-- <h1>Første brett...</h1> -->
    <ChessBoard ref="board" fen="start" />
    <button @click="updateBoardState()">Test</button>
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
    this.$refs.board.position("start");
    this.interval = setInterval(() => {
      //AXIOS kall. evt, metode som kaller axios kall, som venter på svar, setter pgn og og kaller updateBoardState().
      this.setPGN();
    }, 10000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    updateBoardState() {
      // this.fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
      this.game.load_pgn(this.pgn.join("\n"));
      this.fen = this.game.fen();
      this.$refs.board.position(this.fen);
    },
    setPGN() {
      GameService.getPgn(this.boardId)
        .then(response => {
          this.pgn = response.data.pgn;
          this.updateBoardState();
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
