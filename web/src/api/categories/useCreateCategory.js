import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const createCategory = async (formData) => {
	const { data } = await axios.post("/categories", formData);
	return data;
};

export default function useCreateCategory() {
	const queryClient = useQueryClient();
	return useMutation((formData) => createCategory(formData), {
		onSuccess: () => {
			queryClient.fetchQuery("categories");
		},
	});
}
