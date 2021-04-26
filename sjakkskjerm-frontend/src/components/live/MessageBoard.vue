<template>
  <div v-if="show" class="messageboard">
    <h2 class="tittel">Beskjeder fra arrangør:</h2>
    <MessageView
      v-for="message in messages"
      :key="message"
      class="messages"
      :message="message"
    />
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
      messages: [],
      show: true,
      error: null
    };
  },
  mounted() {
    this.fetchMessage();
  },
  methods: {
    fetchMessages() {
      GameService.getMessages()
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          this.error = error;
        });
    },
    fetchMessage() {
      GameService.getMessage(this.tournamentId)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style scoped>
.tittel {
  color: #b95a42;
}
</style>
