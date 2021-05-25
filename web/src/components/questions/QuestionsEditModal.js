import {
	Button,
	Checkbox,
	Drawer,
	Form,
	Input,
	message,
	Select,
	Space,
	Spin,
} from "antd";
import { useIndex, useUpdate } from "api";
import { useState, useEffect, useRef } from "react";

const { Option } = Select;

const QuestionsEditModal = ({ handleClose, question }) => {
	const { data: categories, isLoading } = useIndex("/categories");

	const [form] = Form.useForm();
	const inputRef = useRef();

	const focusFirstInput = (visible) => {
		if (visible) inputRef.current.focus();
	};
	const handleSubmit = () => {
		form.submit();
	};
	const handleCancel = () => {
		form.resetFields();
		handleClose();
	};

	const { mutate, isLoading: isUpdating } = useUpdate(
		"/questions",
		question?.id
	);

	const handleOnFinish = (values) => {
		mutate(values, {
			onError: (err) => {
				const errors = err.response.data.errors;

				Object.keys(errors).forEach((key) => {
					message.error(errors[key][0]);
				});
			},
			onSuccess: () => {
				message.success(`The question has been updated!`);
				handleCancel();
			},
		});
	};

	useEffect(() => {
		form.resetFields();
	}, [question]);

	return (
		<Drawer
			title="Edit question"
			visible={!!question}
			closable={false}
			destroyOnClose
			width={500}
			footer={
				<Spin spinning={isUpdating}>
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
			<Spin spinning={isUpdating}>
				<Form
					name="edit_question"
					onFinish={handleOnFinish}
					form={form}
					initialValues={question}
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
									<Option
										key={id}
										value={id}
										selected={id === question?.category_id}
									>
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
			</Spin>
		</Drawer>
	);
};

export default QuestionsEditModal;
