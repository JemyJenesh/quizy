import { axios } from "utils/axios";
import { useQuery } from "react-query";

const getCategories = async () => {
	const { data } = await axios("/categories");
	return data;
};

export default function useCategories() {
	return useQuery("categories", getCategories);
}
