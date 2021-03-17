<template>
  <div class="tournaments">
    <h1>Velkommen til Sjakk Skjerm</h1>
    <TournamentList />
  </div>
</template>

<script>
// @ is an alias to /src
import TournamentList from "@/components/TournamentList.vue";

export default {
  name: "Tournaments",
  components: {
    TournamentList
  }
};
</script>
