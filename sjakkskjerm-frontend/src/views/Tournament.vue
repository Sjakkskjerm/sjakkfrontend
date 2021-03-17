<template>
  <div class="tournament">
    <ChessBoards />
    <MessageBoard />
    <ResultList />
  </div>
</template>

<script>
import ChessBoards from "@/components/live/ChessBoards.vue";
import MessageBoard from "@/components/live/MessageBoard.vue";
import ResultList from "@/components/live/ResultList.vue";

export default {
  name: "Tournament",
  components: {
    ChessBoards,
    MessageBoard,
    ResultList
  }
};
</script>
