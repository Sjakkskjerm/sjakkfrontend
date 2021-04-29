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
}
</script>

<style scoped>
.message-card {
  padding: 10px;
  cursor: pointer;
  margin-bottom: 1em;
  margin-right: 35%;
  margin-left: 35%;
}
.message-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.message {
  font-style: italic;
  margin: 0%;
  padding: 0%;
}
</style>