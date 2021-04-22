const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        username: "",
        club: "",
        role: "",
    },
    loginStatus:"",
});

//import axios from "axios";
import { tokenAlive } from "../../shared/jwtHelper";
import GameService from "../../services/GameService";

const getters = {
    getAuthData(state){
        return state.authData;
    },
    getLoginStatus(state) {
        return state.loginStatus;
    },
    isTokenActive(state) {
        if (!state.authData.tokenExp) {
            return false
        }
        return tokenAlive(state.authData.tokenExp);
    }   
};

const actions = {
    async login({commit}, payload) {
        const response = await GameService.login(payload)
        .catch((err) => {
                console.log(err);
            });
        if(response && response.data) {
                console.log("Response: " + response);
                console.log("Response data: " + response.data);
                commit("saveTokenData", response.data);
                commit("setLoginStatu", "success");
                
            } else {
                console.log("failed");
                commit("setLoginStatu", "failed");
            }    
        
    }
};

import { jwtDecrypt } from "../../shared/jwtHelper";

const mutations = {
    saveTokenData(state, data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        const jwtDecodedValue = jwtDecrypt(data.access_token);
        const newTokenData = {
            token: data.access_token,
            refreshToken: data.refresh_token,
            tokenExp: jwtDecodedValue.exp,
            userid: jwtDecodedValue.sub,
            uid: jwtDecodedValue.uid,
            role: jwtDecodedValue.role[0].authority,
            /*
            username: jwtDecodedValue.username,
            club: jwtDecodedValue.club,
            */
        };
        console.log("PRE NTD: " + state.authData.username);
        console.log("NTD: " + newTokenData);

        state.authData = newTokenData;

        console.log("POST NTD: " + state.authData.username);
        
    },
    setLoginStatu(state, value) {
        state.loginStatus = value;
    }

};

export default {
    namespaced: true,
    state,
    getters, 
    actions, 
    mutations
}