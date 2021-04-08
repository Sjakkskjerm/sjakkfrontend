import axios from "axios";

// const baseTestUrl = "https://my-json-server.typicode.com/maardal";
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

export default {
  getPgn(gameId) {
    return apiClient.get(gameUrl + gameId);
  },
  getGames(tournamentId) {
    return apiClient.get(tournamentUrl + tournamentId);
  },
  getTournaments() {
    return apiClient.get(backendTournaments);
  }
};
