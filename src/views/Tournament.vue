<template>
  <div v-if="tournamentId" class="tournament-container">
    <ChessBoards class="chess-board-container" :tournament-id="tournamentId" />
    <MessageBoard
      class="message-board-container"
      :tournament-id="tournamentId"
    />
  </div>
</template>

<script>
/*
    Author: Martin Håhjem Årdal
    Displays live chess boards, message board, resultlist, round overview for a tournament.
 */
import ChessBoards from "@/components/live/ChessBoards.vue";
import MessageBoard from "@/components/live/MessageBoard.vue";
import GameService from "@/services/GameService.js";

export default {
  name: "Tournament",
  components: {
    ChessBoards,
    MessageBoard
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "123"
    }
  },
  data() {
    return {
      tournamentId: undefined
    };
  },
  created() {
    this.fetchTournament();
  },
  methods: {
    fetchTournament() {
      GameService.getTournament(this.id)
        .then(response => {
          this.tournamentId = response.data.id.toString();
        })
        .catch(error => {
          if (error.response.status == 404) {
            this.$router.push({ name: "NotFound" });
          }
        });
    }
  }
};
</script>

<style scoped>
.tournament-container {
  display: grid;
  grid-template-columns: 1.8fr 0.2fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
  height: 96vh;
}
.chess-board-container {
  overflow-y: auto;
}

.message-board-container {
  background-color: #e4e4e4;
  float: right;
  overflow-y: auto;
}
</style>
