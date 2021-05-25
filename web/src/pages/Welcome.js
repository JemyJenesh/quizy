import {
	Form,
	Input,
	Button,
	Row,
	Col,
	InputNumber,
	message,
	Typography,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { GuestLayout } from "components";
import { axios } from "utils/axios";
import { useState } from "react";

const Welcome = ({ history }) => {
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);
		axios
			.post("/players", values)
			.then((res) => {
				if (res.status === 200) {
					history.push(`/quizzes/${res.data.quiz_id}/players/${res.data.id}`);
				}
			})
			.catch((err) => {
				if (err.response) {
					const errors = err.response.data.errors;
					Object.keys(errors).map((e) => message.error(errors[e][0]));
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<GuestLayout>
			<Form name="normal_login" onFinish={onFinish} style={{ padding: "2rem" }}>
				<Typography.Title style={{ textAlign: "center" }}>
					Join quiz
				</Typography.Title>
				<Form.Item
					name="name"
					rules={[
						{
							required: true,
							message: "Please enter your name!",
						},
					]}
				>
					<Input prefix={<UserOutlined />} placeholder="Name" />
				</Form.Item>

				<Form.Item
					name="pin"
					rules={[
						{
							required: true,
							message: "Please enter a pin!",
						},
					]}
				>
					<InputNumber
						type="number"
						min={1}
						max={999999}
						prefix={<LockOutlined />}
						placeholder="Quiz pin"
						style={{ width: "100%" }}
					/>
				</Form.Item>

				<Button type="primary" htmlType="submit" block loading={loading}>
					Join
				</Button>

				<Row justify="space-between" align="middle">
					<Col>
						<NavLink to="/register">Register now!</NavLink>
					</Col>
					<Col>
						<NavLink to="/login">Login</NavLink>
					</Col>
				</Row>
			</Form>
		</GuestLayout>
	);
};

export default Welcome;
