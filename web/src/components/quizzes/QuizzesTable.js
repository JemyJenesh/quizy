import { Table, Button, Input, Space, Tooltip, Popconfirm } from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const QuizzesTable = ({
	data,
	loading,
	handleDelete,
	handleEdit,
	handleDetail,
}) => {
	const [search, setSearch] = useState("");
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
		},
		{
			title: "Questions",
			dataIndex: "questions_count",
			align: "right",
		},
		{
			title: "Actions",
			dataIndex: "id",
			align: "right",
			render: (id) => (
				<Space>
					<Tooltip title="View">
						<Button
							type="default"
							shape="circle"
							icon={<EyeOutlined />}
							onClick={() => handleDetail(id)}
						/>
					</Tooltip>
					<Tooltip title="edit">
						<Button
							type="default"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => handleEdit(id)}
						/>
					</Tooltip>
					<Popconfirm
						title="Are you sure you want to delete this quiz?"
						okText="Yes"
						placement="topRight"
						onConfirm={() => {
							handleDelete(id);
						}}
					>
						<Tooltip title="delete">
							<Button shape="circle" danger icon={<DeleteOutlined />}></Button>
						</Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<div style={{ padding: "1rem 2rem" }}>
			<div
				style={{
					marginBottom: 16,
				}}
			>
				<Input
					placeholder="Search by name"
					prefix={<SearchOutlined />}
					style={{ width: 300 }}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<Table
				rowKey="id"
				loading={loading}
				size="small"
				columns={columns}
				dataSource={
					data &&
					data.filter(
						(d) => d.name.toLowerCase().indexOf(search.toLowerCase()) > -1
					)
				}
				pagination={false}
			/>
		</div>
	);
};

export default QuizzesTable;
