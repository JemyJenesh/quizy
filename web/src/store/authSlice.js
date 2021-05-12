import { createSlice } from "@reduxjs/toolkit";
import { axios, setAuthToken } from "utils/axios";
import { message } from "antd";
import Cookies from "js-cookie";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAppLoading: true,
		isLoading: false,
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		appLoaded: (state, action) => {
			state.isAppLoading = false;
			state.user = action.payload;
		},
		requesting: (state) => {
			state.isLoading = true;
		},
		doneRequesting: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	setUser,
	appLoaded,
	requesting,
	doneRequesting,
} = authSlice.actions;

export const checkAuth = () => (dispatch) => {
	const authToken = Cookies.get("authToken");
	if (authToken) {
		setAuthToken(authToken);
		axios
			.get("/user")
			.then((res) => {
				if (res.status === 200) {
					dispatch(appLoaded(res.data));
				}
			})
			.catch((err) => {
				if (err.response) {
					setAuthToken(null);
					dispatch(appLoaded(null));
				}
			});
	} else {
		dispatch(appLoaded(null));
	}
};

export const login = ({ email, password }) => (dispatch) => {
	dispatch(requesting());
	axios
		.post("/login", { email, password })
		.then((res) => {
			if (res.status === 200) {
				setAuthToken(res.data.token);
				dispatch(setUser(res.data.user));
			}
		})
		.catch((err) => {
			if (err.response) {
				switch (err.response.status) {
					case 422:
						message.error("Email or password is invalid!");
						break;
					default:
						message.error("Something went wrong, try later!");
						break;
				}
			}
		})
		.finally(() => {
			dispatch(doneRequesting());
		});
};

export const register = ({ name, email, password }) => (dispatch) => {
	dispatch(requesting());
	axios
		.post("/register", {
			name,
			email,
			password,
		})
		.then((res) => {
			if (res.status === 200) {
				setAuthToken(res.data.token);
				dispatch(setUser(res.data.user));
			}
		})
		.catch((err) => {
			if (err.response.status === 422) {
				message.error(err.response.data.errors.email[0]);
			}
		})
		.finally(() => {
			dispatch(doneRequesting());
		});
};

export const logout = () => (dispatch) => {
	dispatch(requesting());
	axios("/logout")
		.then((res) => {
			if (res.status === 200) {
				setAuthToken(null);
				dispatch(setUser(null));
			}
		})
		.catch((err) => {
			if (err.response) {
				if (err.response.status === 422) {
					message.error("Something went wrong, try later!");
				}
			}
		})
		.finally(() => {
			dispatch(doneRequesting());
		});
};

export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAppLoading = (state) => state.auth.isAppLoading;

export default authSlice.reducer;
