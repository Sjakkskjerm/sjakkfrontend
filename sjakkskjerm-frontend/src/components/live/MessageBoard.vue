<template>
  <div class="messageboard">
    <h3 class="tittel">Meldinger arrangør</h3>
    <div v-if="hasMessages">
      <div v-if="show" class="messagebox">
        <MessageView
          v-for="message in messages"
          :key="message"
          class="messages"
          :message="message"
          :delete-button="false"
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
    <div v-else>
      <p>Ingen meldinger...</p>
    </div>
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
  computed: {
    hasMessages() {
      return this.messages.length > 0;
    }
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
  margin-top: 0.5rem;
  color: #b95a42;
}
.messagebox {
  overflow: hidden;
}
.btn {
  margin-top: 0.5rem;
}
</style>
