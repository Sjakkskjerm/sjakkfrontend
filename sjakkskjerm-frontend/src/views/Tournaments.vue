<template>
  <div class="tournaments">
    <h1>Velkommen til Sjakk Skjerm</h1>
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
