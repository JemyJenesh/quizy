import Axios from "axios";
import { config } from "common";
import Cookies from "js-cookie";

const axios = Axios.create({
	baseURL: config.url,
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
