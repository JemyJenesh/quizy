import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const updateCategory = async (id, formData) => {
	const { data } = await axios.put(`/categories/${id}`, formData);
	return data;
};

export default function useUpdateCategory() {
	const queryClient = useQueryClient();
	return useMutation(({ id, data: formData }) => updateCategory(id, formData), {
		onSuccess: () => {
			queryClient.fetchQuery("categories");
		},
	});
}
