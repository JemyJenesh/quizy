import { Typography, Spin, Card, Space, Button } from "antd";
import { config } from "common";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoading } from "store/authSlice";

const { Title } = Typography;

const Logout = ({ history }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const handleLogout = () => dispatch(logout());
	const handleGoBack = () => history.goBack();

	return (
		<div
			style={{
				height: "100vh",
				backgroundColor: "#eee",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Spin size="large" spinning={isLoading}>
				<Card
					title={
						<Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
							Log out of {config.appName}?
						</Title>
					}
					bordered={false}
					style={{
						width: 300,
						textAlign: "center",
						boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
					}}
				>
					<Space>
						<Button size="large" onClick={handleGoBack}>
							Cancel
						</Button>
						<Button size="large" type="primary" onClick={handleLogout}>
							Log out
						</Button>
					</Space>
				</Card>
			</Spin>
		</div>
	);
};

export default Logout;
