<template>
  <div class="chessboards">
    <BoardManager />
  </div>
</template>

<script>
import BoardManager from "@/components/live/boardview/BoardManager.vue";

export default {
  name: "ChessBoards",
  components: {
    BoardManager
  }
};
</script>
