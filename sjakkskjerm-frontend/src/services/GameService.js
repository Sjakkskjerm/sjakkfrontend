import axios from "axios";

//local
const baseURL_API = "http://localhost:8080/api";

//prod
// const baseURL_API = "http://158.38.101.216:8080/api";

const tournamentsURL = "/tournaments/";
const gamesURL = "/games/";
const gamesForTournamentURL = "/games/gamesfortournament/";
const messagesURL = "/message";
const messageSpecificURL = "/message/specific";

const apiClient = axios.create({
	baseURL: baseURL_API,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default {
	getPgn(gameId) {
		return apiClient.get(gamesURL + gameId);
	},
	getGames(tournamentId) {
		return apiClient.get(gamesForTournamentURL + tournamentId);
	},
	getTournaments() {
		return apiClient.get(tournamentsURL);
	},
	getMessages() {
		return apiClient.get(messagesURL);
	},
	getMessage(tournamentId) {
		return apiClient.get(messageSpecificURL + "?tournamentId=" + tournamentId);
	},
	sendMessages(data) {
		return apiClient.post(messagesURL, data);
	},
};
