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
			{isLoading ? (
				<Spin />
			) : (
				<Card
					title={
						<Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
							Log out of {config.appName}?
						</Title>
					}
					loading={isLoading}
					bordered={false}
					style={{
						width: 300,
						textAlign: "center",
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
			)}
		</div>
	);
};

export default Logout;
