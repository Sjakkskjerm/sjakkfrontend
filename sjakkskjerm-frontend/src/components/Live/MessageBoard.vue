<template>
    <div v-if="show" class="messageboard">
        <h1>Her kommer beskjeder...</h1>
    </div>
</template>

<script>
export default {
    name: "MessageBoard",
    data () {
        return {
            show: false
        }
    }
}
</script>