import { createSlice } from "@reduxjs/toolkit";
import { axios } from "utils/axios";
import { message } from "antd";

const initialState = {
	isLoading: true,
	quiz: null,
	players: null,
	question: null,
	questions: null,
	categories: null,
	time: 0,
	isEnding: false,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		initialStateStarted: (state) => {
			state.isLoading = true;
		},
		setInitialState: (state, action) => {
			const { categories, question, quizQuestions, players, ...quiz } =
				action.payload.data;
			state.quiz = quiz;
			state.question = question;
			state.questions = quizQuestions;
			state.categories = categories;
			state.players = players;
			state.isLoading = false;
		},
		gameEndingStarted: (state) => {
			state.isEnding = true;
		},
		gameEndingSuccess: (state) => {
			state.isEnding = false;
		},
		gameEndingFailed: (state) => {
			state.isEnding = false;
		},
	},
});

export const {
	initialStateStarted,
	setInitialState,
	gameEndingStarted,
	gameEndingSuccess,
	gameEndingFailed,
} = gameSlice.actions;

export const fetchInitailState = (quizId) => async (dispatch) => {
	dispatch(initialStateStarted());
	try {
		const { data } = await axios(`/games/${quizId}/host`);
		dispatch(setInitialState(data));
	} catch (err) {
		if (err.response) {
			message.error("Something went wrong!");
		}
	} finally {
	}
};

export const endGame = (quizId) => async (dispatch) => {
	dispatch(gameEndingStarted());
	try {
		await axios.delete(`/games/${quizId}`);
		dispatch(gameEndingSuccess());
	} catch (err) {
		if (err.response) {
			message.error("Something went wrong!");
			dispatch(gameEndingFailed());
		}
	}
};

export const selectCurrentPlayer = (state) =>
	state.game.players?.find((p) => p.order === state.game.quiz?.turn);

export default gameSlice.reducer;
