<template>
  <div class="tournaments">
    <h1>Velkommen til Sjakk Skjerm</h1>
    <h2>Added just to test github actions.</h2>
    <h3>Going agains...</h3>
    <TournamentManager />
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
