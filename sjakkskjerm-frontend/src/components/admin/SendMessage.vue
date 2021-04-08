<template>
    <h1>Send Melding</h1>
    <hr>
    <form>
        <label>Turnerings ID</label>
        <input type="text" required v-model="meldingData.turneringsId">

        <label>Melding</label>
        <input type="text" required v-model="meldingData.melding">

        <label>Viktighet</label>
        <select v-model="meldingData.viktighet">
            <option
            v-for="option in viktigheter"
            :value="option"
            :key="option"
            :selected="option === meldingData.viktighet">
            {{ option }}
            </option>
        </select>
    </form>

    <p>Turnerings ID: {{ meldingData.turneringsId }}</p>
    <p>Melding: {{ meldingData.melding }}</p>
    <p>Viktighet: {{ meldingData.viktighet }}</p>
</template>

<script>
export default {
    data: function() {
    return {
        viktigheter: [
            'viktig',
            'ikke viktig'
        ],
      meldingData: {
        turneringsId: '',
        melding: '',
        viktighet: ''
      }
    }
    },
    methods: {}
}
</script>

<style>
form {
    max-width: 600px;
    margin: 30px auto;
    text-align: left;
    border-radius: 10px;
}
label {
    display: inline-block;
    margin-top: 20px;
    font-size: 10px;
    text-transform: uppercase;
    color: grey;
}
input {
    display: block;
    padding: 10px 6px; 
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid grey;
}
select {
    margin-left: 10px;
}
</style>