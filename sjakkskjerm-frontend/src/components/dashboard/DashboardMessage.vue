<template>
  <div class="container">
    <div class="message-container">
      <MessageView
        v-for="message in messages.slice().reverse()"
        :key="message"
        class="message"
        :message="message"
      />
    </div>
    <SendMessage
      class="send-message-container"
      :tournamentid="tournamentid"
      @messageSentAcknowledged="fetchMessages"
    />
  </div>
</template>

<script>
import SendMessage from "@/components/dashboard/SendMessage.vue";
import MessageView from "@/components/live/messages/MessageView.vue";
import GameService from "@/services/GameService.js";

export default {
  name: "DashboardMessage",
  components: {
    SendMessage,
    MessageView
  },
  props: {
    tournamentid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      GameService.getMessagesForTournament(this.tournamentid)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
  /* border: solid 1px #ccc; */
  border-radius: 5px;
  overflow: hidden;
}

.message-container {
  display: flex;
  flex-direction: column-reverse;
  /* max-height: 400px; */
  height: 400px;
  overflow: auto;
  /* transform: rotate(180deg); */
  direction: rtl;
}

.message {
  border-bottom: solid 1px #ccc;
  padding: 20px;
  /* transform: rotate(180deg); */
  direction: ltr;
}
/* .send-message-container {
  input {
    width: 100%;
    border: none;
    font-size: 16px;
    padding: 10px;
  }
} */
</style>
