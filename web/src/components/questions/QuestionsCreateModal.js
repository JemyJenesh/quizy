import { Checkbox, Form, Input, Modal, Select } from "antd";
import { useIndex } from "api";
import { useEffect, useRef } from "react";

const { Option } = Select;

const QuestionsCreateModal = ({ visible, handleClose, handleCreate }) => {
	const { data: categories, isLoading } = useIndex("/categories");
	const [form] = Form.useForm();
	const inputRef = useRef();

	const handleSubmit = () => {
		form.submit();
	};
	const handleCancel = () => {
		form.resetFields();
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
			title="Create question"
			visible={visible}
			onCancel={handleCancel}
			onOk={handleSubmit}
		>
			<Form
				form={form}
				name="create_question"
				onFinish={(values) => handleCreate(values, handleCancel)}
				initialValues={{
					text: "",
					category_id: "",
					options: [
						{
							text: "",
							is_correct: true,
						},
						{
							text: "",
							is_correct: false,
						},
						{
							text: "",
							is_correct: false,
						},
						{
							text: "",
							is_correct: false,
						},
					],
				}}
			>
				<Form.Item
					name="text"
					rules={[
						{
							required: true,
							message: "Please enter a question!",
						},
					]}
				>
					<Input placeholder="Question" ref={inputRef} />
				</Form.Item>
				<Form.Item
					name="category_id"
					label="Category"
					rules={[{ required: true, message: "Please choose a category!" }]}
				>
					<Select placeholder="Select a category">
						{!isLoading &&
							categories.data.map(({ id, name }) => (
								<Option key={id} value={id}>
									{name}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.List name="options">
					{(fields) => (
						<>
							{fields.map((field, index) => (
								<div
									key={field.key}
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<Form.Item
										name={[index, "is_correct"]}
										valuePropName="checked"
									>
										<Checkbox
											onChange={(e) => {
												const newValues = form
													.getFieldsValue()
													.options.map((d, i) =>
														i === index
															? { ...d, is_correct: true }
															: e.target.checked
															? { ...d, is_correct: false }
															: d
													);
												form.setFieldsValue({
													...form.getFieldsValue(),
													options: newValues,
												});
											}}
										/>
									</Form.Item>
									<Form.Item
										style={{ width: "95%" }}
										name={[index, "text"]}
										rules={[
											{
												required: true,
												message: "Mission option!",
											},
										]}
									>
										<Input placeholder="Option" />
									</Form.Item>
								</div>
							))}
						</>
					)}
				</Form.List>
			</Form>
		</Modal>
	);
};

export default QuestionsCreateModal;
