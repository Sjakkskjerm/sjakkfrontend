<template>
  <div class="tournament">
    <ChessBoards />
    <MessageBoard class="messageboard"/>
    <ResultList />
  </div>
</template>

<script>
/*
    Author: Martin Håhjem Årdal
    Displays live chess boards, message board, resultlist, round overview for a tournament.
 */
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

<style scoped>
.messageboard {
}
</style>