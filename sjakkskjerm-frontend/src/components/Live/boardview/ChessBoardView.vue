<template>
  <div class="chessboardview">
    <ChessBoard ref="board" fen="start" />
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
    this.fetchBoardPgn();
    this.interval = setInterval(() => {
      this.fetchBoardPgn();
    }, 5000);
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
      console.log("fetching pgn...");
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
