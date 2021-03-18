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
  //Displays live chess boards, message board, resultlist, round overview for a tournament.
  name: "Tournament",
  components: {
    ChessBoards,
    MessageBoard,
    ResultList
  }
};
</script>
