import axios from "axios";

const testUrl = "https://my-json-server.typicode.com/maardal/mockdatabase";

const apiClient = axios.create({
  baseURL: testUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getPgn(gameId) {
    return apiClient.get("/games/" + gameId);
  },
  getGames(tournamentId) {
    return apiClient.get("/games/" + tournamentId);
  }
};
