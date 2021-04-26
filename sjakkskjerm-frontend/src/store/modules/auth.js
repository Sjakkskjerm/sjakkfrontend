const state = () => ({
  authData: {
    token: "",
    refreshToken: "",
    tokenExp: "",
    userId: "",
    username: "",
    club: "",
    role: "",
    role1: ""
  },
  isLoggedIn: false
});

//import axios from "axios";
import { tokenAlive } from "../../shared/jwtHelper";
import GameService from "../../services/GameService";

const getters = {
  getAuthData(state) {
    return state.authData;
  },
  getLoginStatus(state) {
    return state.isLoggedIn;
  },
  isTokenActive(state) {
    if (!state.authData.tokenExp) {
      return false;
    }
    return tokenAlive(state.authData.tokenExp);
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  getToken(state) {
    return state.authData.access_token;
  }
};

const actions = {
  async login({ commit }, payload) {
    const response = await GameService.login(payload).catch(err => {
      console.log(err);
    });
    if (response && response.data) {
      commit("saveTokenData", response.data);
      commit("setLoggedIn", true);
    } else {
      commit("setLoggedIn", false);
    }
  },
  logout({ commit }) {
    commit("logout");
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
      role: jwtDecodedValue.role[0].authority
    };
    state.authData = newTokenData;
  },
  setLoggedIn(state, value) {
    state.isLoggedIn = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
