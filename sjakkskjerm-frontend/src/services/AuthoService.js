import axios from "axios";

//prod URL
// const baseURL_API = "http://158.38.101.216:8080/api";

//local URL
const baseURL_API = "http://localhost:8080/api";

const instance = axios.create({
	baseURL: baseURL_API,
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

const AuthoService = {
	get(url) {
		return instance
			.get(url)
			.then((response) => response)
			.catch((reason) => Promise.reject(reason));
	},

    post(url, data) {
        return instance.post(url, data)
            .then(response => response)
            .catch(reason => Promise.reject(reason));
    },
    put(url) {
        return instance.put(url)
            .then(response => response)
            .catch(reason => Promise.reject(reason));
    }

};

export default AuthoService;
