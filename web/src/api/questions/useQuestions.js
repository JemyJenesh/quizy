import { axios } from "utils/axios";
import { useQuery } from "react-query";

const getQuestions = async () => {
	const { data } = await axios("/questions");
	return data;
};

export default function useQuestions() {
	return useQuery("questions", getQuestions);
}
