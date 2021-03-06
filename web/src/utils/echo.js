import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { config } from "common";

window.Pusher = Pusher;

const options = {
	broadcaster: "pusher",
	key: "493f903d3fd2e1100659",
	cluster: "ap2",
	forceTLS: false,
	wsHost: config.url,
	wsPort: 6001,
	encrypted: false,
	disableStats: true,
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
