import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { AppLayout } from "components";

const Welcome = () => {
	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	return (
		<AppLayout>
			<Form
				name="normal_login"
				onFinish={onFinish}
				style={{ padding: "2rem 0" }}
			>
				<Row justify="center">
					<Col xs={24} md={12} lg={6}>
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
					</Col>
				</Row>
				<Row justify="center">
					<Col xs={24} md={12} lg={6}>
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
					</Col>
				</Row>
				<Row justify="center">
					<Col xs={24} md={12} lg={6}>
						<Button type="primary" htmlType="submit" block>
							Join
						</Button>
					</Col>
				</Row>
				<Row justify="center">
					<Col xs={24} md={12} lg={6}>
						<Row justify="space-between" align="middle">
							<Col>
								<NavLink to="/register">Register now!</NavLink>
							</Col>
							<Col>
								<NavLink to="/login">Login</NavLink>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		</AppLayout>
	);
};

export default Welcome;
