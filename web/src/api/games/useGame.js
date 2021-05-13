import { axios } from "utils/axios";
import { useQuery } from "react-query";

const getGame = async (id) => {
	const { data } = await axios(`/games/${id}`);
	return data;
};

export default function useGame(id) {
	return useQuery(["games", id], () => getGame(id));
}
