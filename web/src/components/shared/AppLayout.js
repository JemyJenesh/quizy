import { Layout } from "antd";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const AppLayout = ({ children }) => {
	return (
		<Layout>
			<Sidebar />
			<Content
				style={{
					backgroundColor: "white",
					position: "relative",
					minHeight: "100vh",
				}}
			>
				{children}
			</Content>
		</Layout>
	);
};

export default AppLayout;
