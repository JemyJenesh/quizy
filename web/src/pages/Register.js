import { Form, Input, Button, Row, Col, Spin, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { GuestLayout } from "components";
import { useDispatch, useSelector } from "react-redux";
import { register, selectIsLoading } from "store/authSlice";

const Register = () => {
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	const onFinish = (values) => {
		dispatch(register(values));
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
						Create account
					</Typography.Title>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: "Please enter your full name!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Full name"
							autoFocus
						/>
					</Form.Item>

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
						<Input type="email" prefix={<MailOutlined />} placeholder="Email" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please enter a password!",
							},
							{
								min: 8,
								message: "Password must be alteast 8 character long!",
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
							<NavLink to="/login">Login</NavLink>
						</Col>
						<Col>
							<Button type="primary" htmlType="submit">
								Register
							</Button>
						</Col>
					</Row>
				</Form>
			</GuestLayout>
		</Spin>
	);
};

export default Register;
