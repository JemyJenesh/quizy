import { axios } from "utils/axios";
import { useQuery } from "react-query";

const useShow = (url, id) => {
	const getData = async () => {
		const { data } = await axios(`${url}/${id}`);
		return data;
	};
	return useQuery([url, id], getData);
};

export default useShow;
