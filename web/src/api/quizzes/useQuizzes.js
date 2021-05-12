import { axios } from "utils/axios";
import { useQuery } from "react-query";

const getQuizzes = async () => {
	const { data } = await axios("/quizzes");
	return data;
};

export default function useQuizzes() {
	return useQuery("quizzes", getQuizzes);
}
