import { Form, Input, Modal } from "antd";
import { useEffect, useRef } from "react";

const CategoriesEditModal = ({ handleClose, handleEdit, category }) => {
	const formRef = useRef();
	const inputRef = useRef();

	const handleSubmit = () => {
		formRef.current.submit();
	};
	const handleCancel = () => {
		formRef.current.resetFields();
		handleClose(null);
	};

	useEffect(() => {
		let timer;
		if (category) {
			timer = setTimeout(() => {
				inputRef.current.focus();
			}, 10);
		}
		return () => clearTimeout(timer);
	}, [category]);

	return (
		<Modal
			title="Edit category"
			visible={!!category}
			onCancel={handleCancel}
			onOk={handleSubmit}
		>
			<Form
				name="edit_category"
				onFinish={(values) =>
					handleEdit({ id: category.id, data: values }, handleCancel)
				}
				ref={formRef}
				initialValues={category}
			>
				<Form.Item
					name="name"
					rules={[
						{
							required: true,
							message: "Please enter a name!",
						},
					]}
				>
					<Input placeholder="Name" ref={inputRef} />
				</Form.Item>

				<Form.Item
					name="description"
					rules={[
						{
							required: true,
							message: "Please enter a short description!",
						},
					]}
				>
					<Input placeholder="Short description" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CategoriesEditModal;
