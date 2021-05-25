import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const useDelete = (url, id) => {
	const queryClient = useQueryClient();
	const deleteData = async () => {
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
