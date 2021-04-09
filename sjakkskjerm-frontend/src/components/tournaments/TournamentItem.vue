<template>
    <tr class="bord1">
        <td class="bord">{{ tournament.tournamentName}}</td>
        <td class="bord">{{ tournament.startDate }}</td>
        <td class="bord">{{ tournament.endDate }}</td>
    </tr>
</template>
<script>
export default {
name: "TournamentItem",
props: {
    tournament: {
        type: Object,
        required: true,
    }
},
data() {
    return {
        id: null,
        games: [],
    };
},
}
</script>

<style scoped>
  .bord{
      padding-left: 1rem;
      padding-right: 1rem;
  }
  .bord1.{
      border: 1px solid black;
      font-size: 24;
  }
</style>