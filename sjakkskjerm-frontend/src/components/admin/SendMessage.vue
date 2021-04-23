<template>
    <div>
        <h1>Send Melding</h1>
        <hr>
        <form>
            <div class="mb-3">
                <label>Turnerings ID</label>
                <input 
                type="text" 
                class="form-control"
                required v-model="meldingData.turneringsId">
            </div>

            <div class="mb-3">
                <label>Melding</label>
                <input 
                type="text" 
                class="form-control"
                required v-model="meldingData.melding">
            </div>

            <div class="mb-3">
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
            </div>
        </form>
    </div>
    <button class="btn btn-primary" v-on:click="sendMessages">Send</button>
</template>

<script>

//import GameService from "@/services/GameService.js";
import AuthoService from "../../services/AuthoService";

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
            const messagesURL = "/message";
            var data = {
                tournamentId: this.meldingData.turneringsId,
                message:this.meldingData.melding,
                importance: this.meldingData.viktighet
            };

            AuthoService.post(messagesURL, data)
                .then(res => {
                    console.log("Yay: " + res)
                })
                .catch(reason => {
                    console.log("Not yay: " + reason);
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

.form-select {

}

</style>