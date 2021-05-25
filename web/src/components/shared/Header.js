import React from "react";
import { Button, PageHeader, Tooltip } from "antd";
import {
	MenuOutlined,
	PlusOutlined,
	UploadOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "store/sidebarSlice";

const Header = ({
	title,
	subTitle,
	handleRefresh,
	handleCreate,
	handleUpload,
	extra = [],
	showIcon = true,
}) => {
	const dispatch = useDispatch();
	const handleToggle = () => dispatch(toggleSidebar());

	return (
		<PageHeader
			style={{
				position: "sticky",
				top: 0,
				background: "#fff",
				padding: ".5rem 2rem",
				borderBottom: "2px solid #eee",
				zIndex: 2,
			}}
			onBack={handleToggle}
			backIcon={showIcon ? <MenuOutlined /> : null}
			title={title}
			subTitle={subTitle}
			extra={[
				handleRefresh && (
					<Tooltip title="Refresh" key="refresh">
						<Button
							type="dashed"
							shape="circle"
							icon={<ReloadOutlined />}
							onClick={handleRefresh}
						></Button>
					</Tooltip>
				),
				handleUpload && (
					<Tooltip title="Import" key="import">
						<Button
							type="dashed"
							shape="circle"
							icon={<UploadOutlined />}
							onClick={handleRefresh}
						></Button>
					</Tooltip>
				),
				handleCreate && (
					<Tooltip title="Create" key="create">
						<Button
							type="primary"
							shape="circle"
							icon={<PlusOutlined />}
							onClick={handleCreate}
						></Button>
					</Tooltip>
				),
				...extra,
			]}
		/>
	);
};

export default Header;
