import { useIndex } from "api";
import {
	AppLayout,
	CategoriesCreateModal,
	CategoriesEditModal,
	CategoriesTable,
	Header,
} from "components";
import { useState } from "react";
import { useQueryClient } from "react-query";

const Categories = () => {
	const queryClient = useQueryClient();
	const [visible, setVisible] = useState(false);
	const toggleModal = () => setVisible(!visible);

	const [category, setCategory] = useState(null);
	const openEditModal = (id) => {
		const { data: categories } = queryClient.getQueryData("/categories");
		const cat = categories.find((cat) => cat.id === id);
		setCategory(cat);
	};

	const { data, isLoading, isFetching, refetch } = useIndex("/categories");

	return (
		<AppLayout>
			<CategoriesCreateModal visible={visible} handleClose={toggleModal} />
			<CategoriesEditModal
				category={category}
				handleClose={() => setCategory(null)}
			/>
			<Header
				title="Categories"
				handleRefresh={refetch}
				handleCreate={toggleModal}
			/>
			<CategoriesTable
				data={!isLoading && data.data}
				loading={isLoading || isFetching}
				handleEdit={openEditModal}
			/>
		</AppLayout>
	);
};

export default Categories;
