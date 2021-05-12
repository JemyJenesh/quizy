import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const createQuestion = async (formData) => {
	const { data } = await axios.post("/questions", formData);
	return data;
};

export default function useCreateQuestion() {
	const queryClient = useQueryClient();
	return useMutation((formData) => createQuestion(formData), {
		onSuccess: () => {
			queryClient.fetchQuery("questions");
		},
	});
}
