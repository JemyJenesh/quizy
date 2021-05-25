import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const useUpdate = (url, id) => {
	const queryClient = useQueryClient();
	const updateData = async (formData) => {
		const { data } = await axios.put(`${url}/${id}`, formData);
		return data;
	};
	return useMutation(updateData, {
		onSuccess: () => {
			queryClient.fetchQuery(url);
		},
	});
};

export default useUpdate;
