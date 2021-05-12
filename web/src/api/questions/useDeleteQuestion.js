import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const deleteQuestion = async (id) => {
	const { data } = await axios.delete(`/questions/${id}`);
	return data;
};

export default function useDeleteQuestion() {
	const queryClient = useQueryClient();
	return useMutation((id) => deleteQuestion(id), {
		onSuccess: () => {
			queryClient.fetchQuery("questions");
		},
	});
}
