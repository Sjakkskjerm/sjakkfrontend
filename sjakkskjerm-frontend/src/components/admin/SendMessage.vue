<template>
    <div>
        <h1>Send Melding</h1>
        <hr>
        <form>
            <label>Turnerings ID</label>
            <input type="text" required v-model="meldingData.turneringsId">

            <label>Melding</label>
            <input type="text" required v-model="meldingData.melding">

            <label>Viktighet</label>
            <select class="form-select" v-model="meldingData.viktighet">
                <option
                v-for="option in viktigheter"
                :value="option"
                :key="option"
                :selected="option === meldingData.viktighet">
                {{ option }}
                </option>
            </select>
        </form>
    </div>
    <button class="btn btn-primary" v-on:click="sendMessages">Send</button>
</template>

<script>

import GameService from "@/services/GameService.js";

export default {
    data: function() {
    return {
        svarlol: [],
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
    methods: {
        sendMessages() {
            var data = {
                turneringsId: this.meldingData.turneringsId,
                melding:this.meldingData.melding,
                viktighet: this.meldingData.viktighet
            };

            console.log("log lol+ " + data);

            GameService.sendMessages(data)
                .then(response => {
                    this.svarlol = this.response.data;
                    console.log("Yay: " + response);
                })
                .catch(error => {
                    console.log("Not yay: " + error);
                })
        }
    }
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