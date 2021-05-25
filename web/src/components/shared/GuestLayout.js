import { Col, Layout, Row } from "antd";
import AboutQuizy from "./AboutQuizy";
import Navbar from "./Navbar";

const { Content } = Layout;

const GuestLayout = ({ children }) => {
	return (
		<Layout>
			<Navbar />
			<Content
				style={{
					backgroundColor: "white",
					minHeight: "calc(100vh - 49px)",
				}}
			>
				<Row>
					<AboutQuizy />
					<Col
						span={8}
						style={{
							position: "sticky",
							top: 48,
							height: "calc(100vh - 49px)",
							backgroundColor: "#fafafa",
							padding: "2rem 0",
						}}
					>
						{children}
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default GuestLayout;
