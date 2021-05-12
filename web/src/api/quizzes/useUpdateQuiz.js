import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const updateQuiz = async (id, formData) => {
	const { data } = await axios.put(`/quizzes/${id}`, formData);
	return data;
};

export default function useUpdateQuiz() {
	const queryClient = useQueryClient();
	return useMutation(({ id, data: formData }) => updateQuiz(id, formData), {
		onSuccess: () => {
			queryClient.fetchQuery("quizzes");
		},
	});
}
