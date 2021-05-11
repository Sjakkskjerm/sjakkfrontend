<template>
  <div>
    <h1>Velkommen til Sjakk Skjerm</h1>
    <hr />
    <TournamentManager class="tournaments" />
  </div>
</template>

<script>
// @ is an alias to /src
import TournamentManager from "@/components/tournaments/TournamentManager.vue";

export default {
  name: "Tournaments",
  components: {
    TournamentManager
  }
};
</script>

<style scoped>
.tournaments {
  margin: 0 25% 0 25%;
}
</style>
