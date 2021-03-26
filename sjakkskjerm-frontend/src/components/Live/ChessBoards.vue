<template>
  <div class="chessboards">
    <!-- <h1>Her kommer sjakkbrett...</h1> -->
    <!-- <ChessBoardView /> -->
    <BoardManager />
  </div>
</template>

<script>
// import ChessBoardView from "@/components/live/boardview/ChessBoardView.vue";
import BoardManager from "@/components/live/boardview/BoardManager.vue";

export default {
  name: "ChessBoards",
  components: {
    BoardManager
    // ChessBoardView
  }
};
</script>
