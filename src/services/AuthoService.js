import axios from "axios";

//prod URL
// const baseURL_API = "https://158.38.101.216:8443/api";

//domain URL
const baseURL_API = "https://martaard-ssprod.uials.no:8443/api";

//local URL
// const baseURL_API = "https://localhost:8443/api";

const instance = axios.create({
  baseURL: baseURL_API
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const AuthoService = {
  get(url) {
    return instance
      .get(url)
      .then(response => response)
      .catch(reason => Promise.reject(reason));
  },

  post(url, data) {
    return instance
      .post(url, data)
      .then(response => response)
      .catch(reason => Promise.reject(reason));
  },
  put(url) {
    return instance
      .put(url)
      .then(response => response)
      .catch(reason => Promise.reject(reason));
  },
  delete(urL) {
    return instance
      .delete(urL)
      .then(response => response)
      .catch(reason => Promise.reject(reason));
  }
};

export default AuthoService;
