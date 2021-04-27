<template>
  <div>
    <MessageView
      v-for="message in messages"
      :key="message"
      :message="message"
    />
    <SendMessage />
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
