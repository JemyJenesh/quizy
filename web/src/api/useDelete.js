import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const useDelete = (url) => {
	const queryClient = useQueryClient();
	const deleteData = async (id) => {
		const { data } = await axios.delete(`${url}/${id}`);
		return data;
	};
	return useMutation(deleteData, {
		onSuccess: () => {
			queryClient.fetchQuery(url);
		},
	});
};

export default useDelete;
