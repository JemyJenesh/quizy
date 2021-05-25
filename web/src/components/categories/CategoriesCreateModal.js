import { Drawer, Form, Input, Button, Space, message, Spin } from "antd";
import { useCreate } from "api";
import { useRef } from "react";

const CategoriesCreateModal = ({ visible, handleClose }) => {
	const formRef = useRef();
	const inputRef = useRef();

	const { mutate, isLoading } = useCreate("/categories");

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
	const handleOnFinish = (values) => {
		mutate(values, {
			onError: (err) => {
				message.error(err.response.data.errors.name[0]);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been created!`);
				handleCancel();
			},
		});
	};

	return (
		<Drawer
			title="Create category"
			visible={visible}
			closable={false}
			destroyOnClose
			width={300}
			footer={
				<Spin spinning={isLoading}>
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
				</Spin>
			}
			footerStyle={{
				padding: ".5rem 1.5rem",
			}}
			afterVisibleChange={focusFirstInput}
		>
			<Spin spinning={isLoading}>
				<Form name="create_category" onFinish={handleOnFinish} ref={formRef}>
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
			</Spin>
		</Drawer>
	);
};

export default CategoriesCreateModal;
