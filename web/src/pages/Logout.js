import { Typography, Modal } from "antd";
import { config } from "common";
import { useDispatch } from "react-redux";
import { logout } from "store/authSlice";

const { Title } = Typography;

const Logout = ({ history }) => {
	const dispatch = useDispatch();
	const handleLogout = () => dispatch(logout());
	const handleGoBack = () => history.goBack();

	return (
		<Modal
			centered
			visible={true}
			onOk={handleLogout}
			onCancel={handleGoBack}
			okText="Log out"
			closable={false}
		>
			<Title level={3} style={{ textAlign: "center" }}>
				Log out of {config.appName}?
			</Title>
		</Modal>
	);
};

export default Logout;
