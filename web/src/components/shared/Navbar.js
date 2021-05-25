import { Menu } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { config, routes } from "common";

const Navbar = () => {
	let location = useLocation();

	return (
		<Menu
			style={{
				display: "flex",
				justifyContent: "flex-end",
				position: "sticky",
				top: 0,
				zIndex: 2000,
			}}
			mode="horizontal"
			defaultSelectedKeys={["/"]}
			selectedKeys={[location.pathname]}
		>
			<Menu.Item
				key="app"
				style={{
					pointerEvents: "none",
					marginRight: "auto",
				}}
				icon={<DeploymentUnitOutlined />}
			>
				{config.appName}
			</Menu.Item>
			{routes
				.filter((route) => !route.auth && route.show)
				.map(({ path, name, exact }) => (
					<Menu.Item key={path}>
						<NavLink to={path} exact={exact}>
							{name}
						</NavLink>
					</Menu.Item>
				))}
		</Menu>
	);
};

export default Navbar;
