import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const deleteQuiz = async (id) => {
	const { data } = await axios.delete(`/quizzes/${id}`);
	return data;
};

export default function useDeleteQuiz() {
	const queryClient = useQueryClient();
	return useMutation((id) => deleteQuiz(id), {
		onSuccess: () => {
			queryClient.fetchQuery("quizzes");
		},
	});
}
