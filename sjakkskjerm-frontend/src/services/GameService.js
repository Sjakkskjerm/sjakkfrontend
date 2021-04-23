import axios from "axios";

//local
const localBackendUrl = "http://localhost:8080";
const localBackendTournaments = "/api/tournaments/";
const localBackendGames = "/api/games/";
const localBackendGamesByTournament = "/api/games/gamesfortournament/";

const apiClient = axios.create({
	baseURL: localBackendUrl,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

const baseURL_API = "http://localhost:8080/api";
const messagesURL = "/message";
const messageSpecificURL = "/message/specific"
const loginURL = "auth/login";
const registerURL ="auth/register";

const apiClient_1 = axios.create({
  baseURL: baseURL_API,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
	getPgn(gameId) {
		return apiClient.get(localBackendGames + gameId);
	},
	getGames(tournamentId) {
		console.log(localBackendUrl + localBackendGamesByTournament + tournamentId);
		return apiClient.get(localBackendGamesByTournament + tournamentId);
	},
	getTournaments() {
		return apiClient.get(localBackendTournaments);
	},
  getMessages() {
    return apiClient_1.get(messagesURL);
  },
  getMessage(tournamentId) {
    return apiClient_1.get(messageSpecificURL + "?tournamentId=" + tournamentId)
  },
  sendMessages(data) {
    return apiClient_1.post(messagesURL, data);
  },
  login(data) {
    return apiClient_1.post(loginURL, data);
  },
  register(data) {
    return apiClient_1.post(registerURL, data);
  }
};
