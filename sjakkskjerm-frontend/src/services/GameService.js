import axios from "axios";

//fake
// const baseTestUrl = "https://my-json-server.typicode.com/maardal";
// const gameUrl = "/mockdatabase/games/";
// const tournamentUrl = "/fake-tournaments/tournaments/";
// const tournamentList = "/fake-tournaments/";

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
const messageSpecificURL = "/message/specific";
const loginURL = "auth/login";
const registerURL = "auth/register";

const apiClient_messages = axios.create({
	baseURL: baseURL_API,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

const apiClient_auth = axios.create({
	baseURL: baseURL_API,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
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
		return apiClient_messages.get(messagesURL);
	},
	getMessage(tournamentId) {
		return apiClient_messages.get(
			messageSpecificURL + "?tournamentId=" + tournamentId
		);
	},
	sendMessages(data) {
		return apiClient_messages.post(messagesURL, data);
	},
	login(data) {
		return apiClient_auth.post(loginURL, data);
	},
	register(data) {
		return apiClient_auth.post(registerURL, data);
	},
};
