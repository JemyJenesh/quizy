import { Form, Input, Modal } from "antd";
import { useEffect, useRef } from "react";

const QuizzesCreateModal = ({ visible, handleClose, handleCreate }) => {
	const formRef = useRef();
	const inputRef = useRef();

	const handleSubmit = () => {
		formRef.current.submit();
	};
	const handleCancel = () => {
		formRef.current.resetFields();
		handleClose();
	};

	useEffect(() => {
		let timer;
		if (visible) {
			timer = setTimeout(() => {
				inputRef.current.focus();
			}, 10);
		}
		return () => clearTimeout(timer);
	}, [visible]);

	return (
		<Modal
			title="Create quiz"
			visible={visible}
			onCancel={handleCancel}
			onOk={handleSubmit}
		>
			<Form
				name="create_quiz"
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
		</Modal>
	);
};

export default QuizzesCreateModal;
