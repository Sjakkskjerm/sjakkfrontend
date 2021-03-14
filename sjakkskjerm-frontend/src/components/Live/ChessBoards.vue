<template>
    <div class="chessboards">
        <h1>Her kommer sjakkbrett...</h1>
        <ChessBoardView/>
    </div>
</template>

<script>
import ChessBoardView from "@/components/live/ChessBoardView.vue";

export default {
    name: "ChessBoards",
    components: {
        ChessBoardView
    }
}
</script>