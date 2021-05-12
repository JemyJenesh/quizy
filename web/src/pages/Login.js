import { Form, Input, Button, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { AppLayout } from "components";
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";

const Login = () => {
	const dispatch = useDispatch();
	const onFinish = (values) => {
		dispatch(login(values));
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
							name="email"
							rules={[
								{
									required: true,
									message: "Please enter your email!",
								},
								{
									type: "email",
									message: "Please enter a valid email!",
								},
							]}
						>
							<Input
								type="email"
								prefix={<MailOutlined />}
								placeholder="Email"
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row justify="center">
					<Col xs={24} md={12} lg={6}>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "Please enter your password!",
								},
							]}
						>
							<Input
								prefix={<LockOutlined />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row justify="center">
					<Col xs={24} md={12} lg={6}>
						<Row justify="space-between" align="middle">
							<Col>
								<NavLink to="/register">Register now!</NavLink>
							</Col>
							<Col>
								<Button type="primary" htmlType="submit">
									Log in
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		</AppLayout>
	);
};

export default Login;
