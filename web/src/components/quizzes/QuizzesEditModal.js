import { Button, Drawer, Form, Input, message, Space, Spin } from "antd";
import { useUpdate } from "api";
import { useRef } from "react";

const QuizzesEditModal = ({ handleClose, quiz }) => {
	const formRef = useRef();
	const inputRef = useRef();

	const { mutate, isLoading } = useUpdate("/quizzes", quiz?.id);

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

	const handleOnFinish = (values) => {
		mutate(values, {
			onError: (err) => {
				message.error(err.response.data.errors.name[0]);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been updated!`);
				handleCancel();
			},
		});
	};

	return (
		<Drawer
			title="Edit quiz"
			visible={!!quiz}
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
							<Button onClick={handleCancel}>Cancel</Button>
							<Button onClick={handleSubmit} type="primary">
								Update
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
				<Form
					name="edit_quiz"
					onFinish={handleOnFinish}
					ref={formRef}
					initialValues={quiz}
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
			</Spin>
		</Drawer>
	);
};

export default QuizzesEditModal;
