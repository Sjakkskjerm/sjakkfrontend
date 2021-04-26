import axios from "axios";

//prod
// const prodBackend = "http://158.38.101.216";

//local
const localBackend = "http://localhost:8080/api";

//paths
const tournaments = "/tournaments/";
const games = "/games/";
const gamesByTournament = "/games/gamesfortournament/";
const message = "/message";
const specificMessage = "/message/specific";
const login = "auth/login";
const register = "auth/register";

const apiClient = axios.create({
  baseURL: localBackend,
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
  getTournaments() {
    return apiClient.get(tournaments);
  },
  getMessages() {
    return apiClient.get(message);
  },
  getMessage(tournamentId) {
    return apiClient.get(specificMessage + "?tournamentId=" + tournamentId);
  },
  sendMessages(data) {
    return apiClient.post(message, data);
  },
  login(data) {
    return apiClient.post(login, data);
  },
  register(data) {
    return apiClient.post(register, data);
  }
};
