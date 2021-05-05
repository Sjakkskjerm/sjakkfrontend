<template>
  <div class="messageboard">
    <h2 class="tittel">Beskjeder fra arrangør:</h2>
    <div v-if="show" class="messagebox">
      <MessageView
        v-for="message in messages"
        :key="message"
        class="messages"
        :message="message"
        @deleteMessageAcknowledged="fetchMessage"
      />
    </div>
    <button v-if="show" class="btn btn-outline-dark" @click="show = false">
      Skjul meldinger
    </button>
    <button v-if="!show" class="btn btn-outline-dark" @click="show = true">
      Vis meldinger
    </button>
  </div>
</template>

<script>
import GameService from "@/services/GameService.js";
import MessageView from "@/components/live/messages/MessageView.vue";

export default {
  name: "MessageBoard",
  components: {
    MessageView
  },
  props: {
    tournamentId: {
      type: String,
      required: true,
      default: "123"
    }
  },
  data() {
    return {
      fetchInterval: 0,
      messages: [],
      show: true
    };
  },
  mounted() {
    this.fetchMessage();
    this.startFetchInterval(4000);
  },
  unmounted() {
    this.stopFetchInterval();
  },
  methods: {
    fetchMessage() {
      GameService.getMessagesForTournament(this.tournamentId)
        .then(response => {
          this.messages = response.data;
          if (this.messages.length == 0) {
            this.stopFetchInterval();
          }
          console.log(this.messages);
        })
        .catch(error => {
          console.log("Not yay: " + error);
        });
    },
    startFetchInterval(fetchInterval) {
      this.fetchInterval = setInterval(() => {
        this.fetchMessage();
      }, fetchInterval);
    },
    stopFetchInterval() {
      clearInterval(this.fetchInterval);
    }
  }
};
</script>

<style scoped>
.tittel {
  color: #b95a42;
}
</style>
