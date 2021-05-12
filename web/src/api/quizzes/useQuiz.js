import { axios } from "utils/axios";
import { useQuery } from "react-query";

const getQuiz = async (id) => {
	const { data } = await axios(`/quizzes/${id}`);
	return data;
};

export default function useQuiz(id) {
	return useQuery(["quizzes", id], () => getQuiz(id));
}
