import { Form, Input, Button, Row, Col, Spin, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { GuestLayout } from "components";
import { useDispatch, useSelector } from "react-redux";
import { login, selectIsLoading } from "store/authSlice";

const Login = () => {
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();
	const onFinish = (values) => {
		dispatch(login(values));
	};

	return (
		<Spin spinning={isLoading}>
			<GuestLayout>
				<Form
					name="normal_login"
					onFinish={onFinish}
					style={{ padding: "2rem" }}
				>
					<Typography.Title style={{ textAlign: "center" }}>
						Login
					</Typography.Title>
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
							autoFocus
						/>
					</Form.Item>

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
				</Form>
			</GuestLayout>
		</Spin>
	);
};

export default Login;
