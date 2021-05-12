import Pusher from "pusher-js";
import Echo from "laravel-echo";

// window.Pusher = Pusher;

const options = {
	broadcaster: "pusher",
	key: "493f903d3fd2e1100659",
	cluster: "ap2",
	forceTLS: true,
	// encrypted: false,
	//authEndpoint is your apiUrl + /broadcasting/auth
	// authEndpoint: "https://api.abc.com/broadcasting/auth",
	// As I'm using JWT tokens, I need to manually set up the headers.
	// auth: {
	// 	headers: {
	// 		"X-CSRF-TOKEN": csrf_token,
	// 		Authorization: "Bearer " + cookies.get("access_token"),
	// 		Accept: "application/json",
	// 	},
	// },
};

const echo = new Echo(options);

export default echo;
