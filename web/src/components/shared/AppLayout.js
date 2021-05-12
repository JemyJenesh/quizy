import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "store/authSlice";

const { Content } = Layout;

const AppLayout = ({ children }) => {
	const user = useSelector(selectUser);

	return (
		<Layout>
			{!user ? <Navbar /> : <Sidebar />}

			<Content
				style={{
					position: "relative",
					// marginTop: show ? 64 : 0,
					minHeight: !user ? "calc(100vh - 64px)" : "100vh",
				}}
			>
				{children}
			</Content>
		</Layout>
	);
};

export default AppLayout;
