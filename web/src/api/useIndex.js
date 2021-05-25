import { axios } from "utils/axios";
import { useQuery } from "react-query";

const useIndex = (url) => {
	const getData = async () => {
		const { data } = await axios(url);
		return data;
	};
	return useQuery(url, getData);
};

export default useIndex;
