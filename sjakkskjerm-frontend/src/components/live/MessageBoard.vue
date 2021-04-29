<template>
  <div class="messageboard">
    <h2 class="tittel">Beskjeder fra arrangør:</h2>
    <div class="messagebox" v-if="show">
      <MessageView
        v-for="message in messages"
        :key="message"
        class="messages"
        :message="message"
        @deleteMessageAcknowledged="fetchMessage"
      />
    </div>
    <button class="btn btn-outline-dark" v-on:click="show = false" v-if="show">Skjul meldinger</button>
    <button class="btn btn-outline-dark" v-on:click="show = true" v-if="!show">Vis meldinger</button>
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
    clearInterval(this.fetchInterval);
  },
  methods: {
    fetchMessage() {
      GameService.getMessagesForTournament(this.tournamentId)
        .then(response => {
          this.messages = response.data;
          console.log("Yay: " + response);
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
    }
  }
};
</script>

<style scoped>
.tittel {
  color: #b95a42
}
</style>
