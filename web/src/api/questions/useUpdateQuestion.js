import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const updateQuestion = async (id, formData) => {
	const { data } = await axios.put(`/questions/${id}`, formData);
	return data;
};

export default function useUpdateQuestion() {
	const queryClient = useQueryClient();
	return useMutation(({ id, data: formData }) => updateQuestion(id, formData), {
		onSuccess: () => {
			queryClient.fetchQuery("questions");
		},
	});
}
