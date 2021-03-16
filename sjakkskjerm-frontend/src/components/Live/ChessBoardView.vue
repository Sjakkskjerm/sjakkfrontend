<template>
  <div class="chessboardview">
    <h1>Første brett...</h1>
    <ChessBoard v-bind="start" />
  </div>
</template>

<script>
import ChessBoard from "@/components/live/boardview/ChessBoard.vue";

export default {
  name: "ChessBoardView",
  components: {
    ChessBoard
  }
};
</script>

<style scoped>
.chessboardview {
  width: 400px;
}
</style>
