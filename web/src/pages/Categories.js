import { message } from "antd";
import {
	useCategories,
	useCreateCategory,
	useDeleteCategory,
	useUpdateCategory,
} from "api";
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

	const [category, setCategory] = useState(null);
	const openEditModal = (id) => {
		const { data: categories } = queryClient.getQueryData("categories");
		const cat = categories.find((cat) => cat.id === id);
		setCategory(cat);
	};

	const { data, isLoading, isFetching, refetch } = useCategories();
	const { mutate } = useCreateCategory();
	const { mutate: deleteCategory } = useDeleteCategory();
	const { mutate: updateCategory } = useUpdateCategory();

	const toggleModal = () => setVisible(!visible);

	const handleCreate = (value, afterCreate) => {
		mutate(value, {
			onError: (err) => {
				message.error(err.response.data.errors.name[0]);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been created!`);
				afterCreate();
			},
		});
	};

	const handleEdit = (data, afterUpdate) => {
		updateCategory(data, {
			onError: (err) => {
				message.error(err.response.data.errors.name[0]);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been updated!`);
				afterUpdate();
			},
		});
	};

	const handleDelete = (id) => {
		deleteCategory(id, {
			onError: (err) => {
				message.error(err.response.data.message);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been deleted!`);
			},
		});
	};

	return (
		<AppLayout>
			<CategoriesCreateModal
				visible={visible}
				handleClose={toggleModal}
				handleCreate={handleCreate}
			/>
			{category && (
				<CategoriesEditModal
					category={category}
					handleClose={() => setCategory(null)}
					handleEdit={handleEdit}
				/>
			)}
			<Header
				title="Categories"
				handleRefresh={refetch}
				handleCreate={toggleModal}
			/>
			<CategoriesTable
				data={!isLoading && data.data}
				loading={isLoading || isFetching}
				handleDelete={handleDelete}
				handleEdit={openEditModal}
			/>
		</AppLayout>
	);
};

export default Categories;
