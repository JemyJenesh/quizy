import { axios } from "utils/axios";
import { useMutation } from "react-query";

const createQuiz = async (formData) => {
	const { data } = await axios.post("/quiz-questions", formData);
	return data;
};

export default function useCreateQuizQuestions() {
	return useMutation((formData) => createQuiz(formData));
}
