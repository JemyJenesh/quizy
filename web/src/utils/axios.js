import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
	baseURL: "http://127.0.0.1:8000/api",
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

// axios.interceptors.response.use(
// 	(res) => res,
// 	(err) => {
// 		if (typeof err.response === "undefined") {
// 			toast.error("Something went wrong, try later!");
// 		} else if (401 === err.response.status) {
// 			toast.error("Please login to continue!");
// 			Cookies.remove("authToken");
// 		} else {
// 			return Promise.reject(err);
// 		}
// 	}
// );

export { axios, setAuthToken };
