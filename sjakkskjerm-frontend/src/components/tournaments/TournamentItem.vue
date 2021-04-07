<template>
    <div>
        <p> {{ tournament.id + ", " + tournament.startDate + ", " + tournament.endDate }} </p>
    </div>
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