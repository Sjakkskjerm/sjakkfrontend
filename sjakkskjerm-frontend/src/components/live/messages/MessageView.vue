<template>
    <div class = "message-card">
        <p class="message">{{ message.date}}: {{message.message}}</p>
        <button @click="deleteMsg" 
    v-if="gettersAuthData.role === 'ROLE_ORGANIZER' || gettersAuthData.role === 'ROLE_ADMIN'"
    class="btn btn-dark">Slett</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AuthoService from '../../../services/AuthoService';

export default {
    name: "MessageView",
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    computed: {
    ...mapGetters('auth', {
      gettersAuthData:'getAuthData'
    })
  },
  methods: {
    deleteMsg() {
      const messageURL = "/message/delete?messageId=" + this.message.messageId;
      console.log(messageURL)

      AuthoService.delete(messageURL)
        .then(response => {
          console.log("OK: " + response)
        })
        .catch(reason => {
          console.log("Not OK: " + reason);
        })
    }
  }
};
</script>

<style scoped>
.message-card {
  padding: 10px;
  margin-bottom: 1em;
  margin-right: 5%;
  margin-left: 5%;
}

.message {
  /* font-style: italic; */
  margin: 0%;
  padding: 0%;
  float: left;
}
</style>
