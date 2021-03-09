<template>
    <div class="tournament">
        <h1>Turneringsskjerm...</h1>
        <ChessBoards/>
        <MessageBoard/>
        <ResultList/>
    </div>
</template>

<script>
import ChessBoards from "@/components/Live/ChessBoards.vue";
import MessageBoard from "@/components/Live/MessageBoard.vue";
import ResultList from "@/components/Live/ResultList.vue";

export default {
    name: "tournament",
    components: {
        ChessBoards, MessageBoard, ResultList
    }
}
</script>