import axios from "axios";

//prod URL
// const backendURL = "http://158.38.101.216:8080/api";

//local URL
const backendURL = "http://localhost:8080/api";

//paths/routes
const tournaments = "/tournaments/";
const tournament = "/tournaments/tournament";
const tournamentsByOwner = "/tournaments/tournamentsbyowner?";
const games = "/games/";
const gamesByTournament = "/games/gamesfortournament/";
const messagesURL = "/message";
const messageSpecificURL = "/message/specific";
const loginURL = "auth/login";
const registerURL = "auth/register";

const apiClient = axios.create({
  baseURL: backendURL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getPgn(gameId) {
    return apiClient.get(games, { params: { id: gameId } });
  },
  getGames(tournamentId) {
    return apiClient.get(gamesByTournament, {
      params: { tournamentid: tournamentId }
    });
  },
  getTournament(tournamentId) {
    return apiClient.get(tournament, {
      params: { tournamentid: tournamentId }
    });
  },
  getTournaments() {
    return apiClient.get(tournaments);
  },
  getTournamentsByOwner(ownerId) {
    return apiClient.get(tournamentsByOwner, { params: { ownerid: ownerId } });
  },
  getMessages() {
    return apiClient.get(messagesURL);
  },
  getMessagesForTournament(tournamentId) {
    return apiClient.get(messageSpecificURL + "?tournamentId=" + tournamentId);
  },
  sendMessages(data) {
    return apiClient.post(messagesURL, data);
  },
  login(data) {
    return apiClient.post(loginURL, data);
  },
  register(data) {
    return apiClient.post(registerURL, data);
  }
};
