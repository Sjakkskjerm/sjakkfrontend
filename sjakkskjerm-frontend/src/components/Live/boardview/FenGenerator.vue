<script>
import Chess from "chess.js";

export default {
  props: ["pgn"],
  data() {
    return {
      game: {},
      fen: null
    };
  },
  mounted() {
    this.game = new Chess();
  },
  methods: {
    generateFen() {
      this.fen = this.game.fen;
    },
    loadPgn() {
      this.game.loadPgn(this.pgn);
    }
  }
};
</script>
