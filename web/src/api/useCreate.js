import { axios } from "utils/axios";
import { useMutation, useQueryClient } from "react-query";

const useCreate = (url) => {
	const queryClient = useQueryClient();
	const createData = async (formData) => {
		const { data } = await axios.post(url, formData);
		return data;
	};
	return useMutation(createData, {
		onSuccess: () => {
			queryClient.fetchQuery(url);
		},
	});
};

export default useCreate;
