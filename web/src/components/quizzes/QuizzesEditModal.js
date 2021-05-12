import { Form, Input, Modal } from "antd";
import { useEffect, useRef } from "react";

const QuizzesEditModal = ({ handleClose, handleEdit, quiz }) => {
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
		if (quiz) {
			timer = setTimeout(() => {
				inputRef.current.focus();
			}, 10);
		}
		return () => clearTimeout(timer);
	}, [quiz]);

	return (
		<Modal
			title="Edit quiz"
			visible={!!quiz}
			onCancel={handleCancel}
			onOk={handleSubmit}
		>
			<Form
				name="edit_quiz"
				onFinish={(values) =>
					handleEdit({ id: quiz.id, data: values }, handleCancel)
				}
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
		</Modal>
	);
};

export default QuizzesEditModal;
