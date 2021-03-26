import axios from "axios";

const baseTestUrl = "https://my-json-server.typicode.com/maardal";
const tournamentUrl = "/fake-tournaments/tournaments/";
const gameUrl = "/mockdatabase/games/";

const apiClient = axios.create({
  baseURL: baseTestUrl,
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
  }
};
