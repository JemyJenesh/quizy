import { createSlice } from "@reduxjs/toolkit";
import { axios } from "utils/axios";
import { message } from "antd";

const GAME_STATE = {
	LOADING: -1,
	WAITING: 0,
	RUNNING: 1,
	ENDED: 2,
};
const PLAYER_STATE = {
	IDLE: 0,
	SUBMITTING: 1,
	PASSING: 2,
};

export const playerSlice = createSlice({
	name: "player",
	initialState: {
		gameState: GAME_STATE.LOADING,
		playerState: PLAYER_STATE,
		quiz: null,
		players: null,
		player: null,
		question: null,
		time: 0,
		selectedOption: null,
		showAnswer: false,
		hasAnswered: true,
	},
	reducers: {
		setInitialState: (state, action) => {
			console.log(state, action);
			// state.user = action.payload;
		},
		initialStateLoaded: (state) => {
			// state.gameState = GAME_STATE.
		},
	},
});

export const { setInitialState, initialStateLoaded } = playerSlice.actions;

export const fetchInitailState = (playerId) => async (dispatch) => {
	try {
		const { data } = await axios("/players", playerId);
		dispatch(setInitialState(data));
	} catch (err) {
		if (err.response) {
			message.error("Something went wrong!");
		}
	} finally {
	}
};

export default playerSlice.reducer;
