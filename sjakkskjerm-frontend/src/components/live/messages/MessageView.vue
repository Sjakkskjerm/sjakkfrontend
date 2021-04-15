<template>
    <div class = "melding_wrap">
        <div class="tittel">
            {{  "Melding fra arrangør "}}
        </div>
        <div class="dato">
            {{" - " + message.dato}}
        </div>
        <div class="melding">
            {{" - " + message.melding }}
        </div>
    </div>
</template>


<script>
export default {
    name: "MessageView",
    props: {
        message: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.melding_wrap {
}
.tittel, .dato, .melding {
}

.tittel {
}

.dato {
    color: green;
}

.melding {
    color: blue;
}

</style>