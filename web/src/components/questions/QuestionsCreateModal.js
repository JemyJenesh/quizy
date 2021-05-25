import {
	Checkbox,
	Form,
	Input,
	Drawer,
	Spin,
	Button,
	Select,
	Space,
	message,
} from "antd";
import { useCreate, useIndex } from "api";
import { useRef } from "react";

const { Option } = Select;

const QuestionsCreateModal = ({ visible, handleClose }) => {
	const { data: categories, isLoading } = useIndex("/categories");
	const { mutate, isLoading: isCreating } = useCreate("/questions");

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
	const handleOnFinish = (value) => {
		mutate(value, {
			onError: (err) => {
				message.error(err.response.data.errors.text[0]);
			},
			onSuccess: () => {
				message.success(`New question created!`);
				handleCancel();
			},
		});
	};

	return (
		<Drawer
			title="Create question"
			visible={visible}
			closable={false}
			destroyOnClose
			width={500}
			footer={
				<Spin spinning={isCreating}>
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
			<Spin spinning={isCreating}>
				<Form
					form={form}
					name="create_question"
					onFinish={handleOnFinish}
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
			</Spin>
		</Drawer>
	);
};

export default QuestionsCreateModal;
