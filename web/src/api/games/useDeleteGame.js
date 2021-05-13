import { axios } from "utils/axios";
import { useMutation } from "react-query";

const deleteGame = async (id) => {
	const { data } = await axios.delete(`/games/${id}`);
	return data;
};

export default function useDeleteGame() {
	return useMutation((id) => deleteGame(id));
}
