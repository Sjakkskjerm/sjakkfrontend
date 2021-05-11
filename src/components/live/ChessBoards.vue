<template>
  <div class="chessboards">
    <BoardManager :tournament-id="tournamentId" />
  </div>
</template>

<script>
import BoardManager from "@/components/live/boardview/BoardManager.vue";

export default {
  name: "ChessBoards",
  components: {
    BoardManager
  },
  props: {
    tournamentId: {
      type: String,
      required: true,
      default: "123"
    }
  }
};
</script>
