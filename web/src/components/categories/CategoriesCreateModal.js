import { Drawer, Form, Input, Button, Space } from "antd";
import { useRef } from "react";

const CategoriesCreateModal = ({ visible, handleClose, handleCreate }) => {
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
		handleClose();
	};

	return (
		<Drawer
			title="Create category"
			visible={visible}
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
							Create
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
				name="create_category"
				onFinish={(values) => handleCreate(values, handleCancel)}
				ref={formRef}
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

export default CategoriesCreateModal;
