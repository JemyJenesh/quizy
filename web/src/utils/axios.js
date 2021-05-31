import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
	// baseURL: "https://quizy-api.jenesh.com.np/api/",
	baseURL: "http://127.0.0.1:8000/api",
	// baseURL: "http://192.168.1.4:8000/api",
});

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		Cookies.set("authToken", token, {
			expires: 100,
		});
	} else {
		delete axios.defaults.headers.common["Authorization"];
		Cookies.remove("authToken");
	}
};

export { axios, setAuthToken };
