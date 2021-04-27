<template>
    <div>
        <MessageView :message="message"/>
        <SendMessage />
    </div>
</template>

<script>
import SendMessage from "@/components/dashboard/SendMessage.vue";
import MessageView from "@/components/live/messages/MessageView.vue";

export default {
    name: "DashboardMessage",
    components: {
        SendMessage,
        MessageView
    },
    data() {
        return {
            message: {
                date: "test",
                message: "min sin beskjed"
            }
        }
    }
}
</script>