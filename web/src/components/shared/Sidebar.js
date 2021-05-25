import { Layout, Menu } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { selectOpen } from "store/sidebarSlice";
import { useSelector } from "react-redux";
import { config, routes } from "common";

const { Sider } = Layout;

const Sidebar = () => {
	const open = useSelector(selectOpen);
	const location = useLocation();

	return (
		<Sider
			style={{
				position: "sticky",
				top: 0,
				overflow: "auto",
				height: "100vh",
			}}
			trigger={null}
			collapsed={open}
			collapsible
			theme="light"
		>
			<Menu
				mode="inline"
				defaultSelectedKeys={location.pathname}
				style={{ height: "100vh" }}
			>
				<Menu.Item
					key="app"
					style={{ pointerEvents: "none" }}
					icon={<DeploymentUnitOutlined />}
				>
					{config.appName}
				</Menu.Item>
				{routes
					.filter((route) => route.auth && route.show)
					.map(({ path, name, exact, icon }) => (
						<Menu.Item key={path} icon={icon}>
							<NavLink to={path} exact={exact}>
								{name}
							</NavLink>
						</Menu.Item>
					))}
			</Menu>
		</Sider>
	);
};

export default Sidebar;
