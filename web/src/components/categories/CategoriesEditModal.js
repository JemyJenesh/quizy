import { Form, Input, Drawer, Button, Space } from "antd";
import { useRef } from "react";

const CategoriesEditModal = ({ handleClose, handleEdit, category }) => {
	const formRef = useRef();
	const inputRef = useRef();

	const focusFirstInput = (visible) => {
		if (visible) inputRef.current.focus();
	};
	const handleSubmit = () => {
		formRef.current.submit();
	};
	const handleCancel = () => {
		formRef.current.resetFields();
		handleClose(null);
	};

	return (
		<Drawer
			title="Edit category"
			visible={!!category}
			closable={false}
			destroyOnClose
			width={300}
			footer={
				<div
					style={{
						textAlign: "right",
					}}
				>
					<Space>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleSubmit} type="primary">
							Update
						</Button>
					</Space>
				</div>
			}
			footerStyle={{
				padding: ".5rem 1.5rem",
			}}
			afterVisibleChange={focusFirstInput}
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
		</Drawer>
	);
};

export default CategoriesEditModal;
