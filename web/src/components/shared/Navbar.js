import { Layout, Menu } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "common";

const { Header } = Layout;

const Navbar = () => {
	let location = useLocation();

	return (
		<Header
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "0 2rem",
			}}
		>
			<NavLink to="/">
				<DeploymentUnitOutlined style={{ color: "#fff", fontSize: 24 }} />
			</NavLink>
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={["/"]}
				selectedKeys={[location.pathname]}
			>
				{routes
					.filter((route) => !route.auth)
					.map(({ path, name, exact }) => (
						<Menu.Item key={path}>
							<NavLink to={path} exact={exact}>
								{name}
							</NavLink>
						</Menu.Item>
					))}
			</Menu>
		</Header>
	);
};

export default Navbar;
