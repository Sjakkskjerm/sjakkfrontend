<template>
  <div class="tournaments">
    <h1> Velkommen til Sjakk Skjerm</h1>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <TournamentList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TournamentList from "@/components/TournamentList.vue";

export default {
  name: "tournaments",
  components: {
    TournamentList
  }
};
</script>
