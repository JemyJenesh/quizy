import { Button, Layout, Space, Typography } from "antd";
import { config } from "common";
import { useDispatch } from "react-redux";
import { logout } from "store/authSlice";

const { Title } = Typography;

const { Content } = Layout;

const Logout = ({ history }) => {
	const dispatch = useDispatch();
	const handleLogout = () => dispatch(logout());
	const handleGoBack = () => history.goBack();

	return (
		<Layout>
			<Content
				style={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						padding: "2rem",
						backgroundColor: "white",
						borderRadius: "1rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Title level={3}>Log out of {config.appName}?</Title>
					<Space size="middle">
						<Button onClick={handleGoBack}>Cancel</Button>
						<Button type="primary" onClick={handleLogout}>
							Log out
						</Button>
					</Space>
				</div>
			</Content>
		</Layout>
	);
};

export default Logout;
