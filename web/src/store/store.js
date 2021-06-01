import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sidebarReducer from "./sidebarSlice";
import playerReducer from "./playerSlice";
import gameReducer from "./gameSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		player: playerReducer,
		game: gameReducer,
	},
});
