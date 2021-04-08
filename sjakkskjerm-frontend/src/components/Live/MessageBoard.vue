<template>
  <div v-if="show" class="messageboard">
    <h1>Beskjeder:</h1>
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
  data() {
    return {
      messages: [],
      show: true
    };
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      GameService.getMessages()
        .then(response => {
          this.messages = response.data;
          console.log("Yay: " + response);
          console.log(this.messages);
        })
        .catch(error => {
          console.log("Not yay: " + error);
        })
    }
  }
};
</script>

<style scoped>
  .messages {
  }
</style>