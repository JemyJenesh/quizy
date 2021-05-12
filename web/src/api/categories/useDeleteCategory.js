import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const deleteCategory = async (id) => {
	const { data } = await axios.delete(`/categories/${id}`);
	return data;
};

export default function useDeleteCategory() {
	const queryClient = useQueryClient();
	return useMutation((id) => deleteCategory(id), {
		onSuccess: () => {
			queryClient.fetchQuery("categories");
		},
	});
}
