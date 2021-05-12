import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const createQuiz = async (formData) => {
	const { data } = await axios.post("/quizzes", formData);
	return data;
};

export default function useCreateQuiz() {
	const queryClient = useQueryClient();
	return useMutation((formData) => createQuiz(formData), {
		onSuccess: () => {
			queryClient.fetchQuery("quizzes");
		},
	});
}
