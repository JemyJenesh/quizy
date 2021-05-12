import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sidebarReducer from "./sidebarSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
	},
});
