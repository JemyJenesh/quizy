import { axios } from "utils/axios";
import { useMutation } from "react-query";

const createGame = async (formData) => {
	const { data } = await axios.post("/games", formData);
	return data;
};

export default function useCreateGame() {
	return useMutation((formData) => createGame(formData));
}
