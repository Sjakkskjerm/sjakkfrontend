import axios from "axios";

const baseTestUrl = "https://my-json-server.typicode.com/maardal";
const tournamentUrl = "/fake-tournaments/tournaments/";
const gameUrl = "/mockdatabase/games/";
const baseBackendUrl = "http://localhost:8080";
const backendTournaments = "/api/tournaments/";
// const tournamentList = "/fake-tournaments/";

const apiClient = axios.create({
  baseURL: baseBackendUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const baseURL_API = "http://localhost:8080/api";
const messagesURL = "/message";
const messageSpecificURL = "/message/specific"
const loginURL = "auth/login";
const registerURL ="auth/register";

const apiClient_messages = axios.create({
  baseURL: baseURL_API,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const apiClientBoards = axios.create({
  baseURL: baseTestUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const apiClient_auth = axios.create({
  baseURL: baseURL_API,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export default {
  getPgn(gameId) {
    return apiClientBoards.get(gameUrl + gameId);
  },
  getGames(tournamentId) {
    return apiClientBoards.get(tournamentUrl + tournamentId);
  },
  getTournaments() {
    return apiClient.get(backendTournaments);
  },
  getMessages() {
    return apiClient_messages.get(messagesURL);
  },
  getMessage(tournamentId) {
    return apiClient_messages.get(messageSpecificURL + "?tournamentId=" + tournamentId)
  }
  ,
  sendMessages(data) {
    return apiClient_messages.post(messagesURL, data);
  },
  login(data) {
    return apiClient_auth.post(loginURL, data);
  },
  register(data) {
    return apiClient_auth.post(registerURL, data);
  }
};
