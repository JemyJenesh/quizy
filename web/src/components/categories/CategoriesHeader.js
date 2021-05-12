import { PageHeader, Button, Tooltip } from "antd";
import { MenuOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "store/sidebarSlice";

const CategoriesHeader = ({ handleCreate, handleRefresh }) => {
	const dispatch = useDispatch();
	const toggle = () => dispatch(toggleSidebar());
	return (
		<PageHeader
			onBack={toggle}
			title="Categories"
			backIcon={<Button type="text" shape="circle" icon={<MenuOutlined />} />}
			extra={[
				<Tooltip title="Refresh" key="refresh">
					<Button
						type="text"
						shape="circle"
						icon={<ReloadOutlined />}
						onClick={handleRefresh}
					></Button>
				</Tooltip>,
				<Tooltip title="Create" key="create">
					<Button
						type="primary"
						shape="circle"
						icon={<PlusOutlined />}
						onClick={handleCreate}
					></Button>
				</Tooltip>,
			]}
		/>
	);
};

export default CategoriesHeader;
