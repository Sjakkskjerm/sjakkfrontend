<template>
  <div class="chessboardview">
    <!-- <h1>Første brett...</h1> -->
    <ChessBoard ref="board" fen="start" />
    <button @click="updateBoardState()">Test</button>
  </div>
</template>

<script>
import ChessBoard from "@/components/live/boardview/ChessBoard.vue";

export default {
  name: "ChessBoardView",
  components: {
    ChessBoard
  },
  data() {
    return {
      fen: null
    };
  },
  mounted() {
    this.$refs.board.position(this.currentfen);
  },
  methods: {
    updateBoardState() {
      this.fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
      this.$refs.board.position(this.fen);
    }
  }
};
</script>

<style scoped>
.chessboardview {
  width: 400px;
}
</style>
