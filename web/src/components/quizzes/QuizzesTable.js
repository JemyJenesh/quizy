import {
	Table,
	Button,
	Input,
	Space,
	Tooltip,
	Popconfirm,
	message,
} from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	EyeOutlined,
	WifiOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { useDelete } from "api";

const QuizzesTable = ({
	data,
	loading,
	handleEdit,
	handleDetail,
	handleHosting,
}) => {
	const [search, setSearch] = useState("");
	const [id, setId] = useState(null);
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (name) => (
				<Highlighter
					autoEscape
					highlightClassName="text-highlight"
					searchWords={[search]}
					textToHighlight={name}
				/>
			),
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
			render: (rowId) => (
				<Space>
					<Tooltip title="Host">
						<Button
							type="default"
							shape="circle"
							icon={<WifiOutlined />}
							onClick={() => handleHosting(rowId)}
						/>
					</Tooltip>
					<Tooltip title="View">
						<Button
							type="default"
							shape="circle"
							icon={<EyeOutlined />}
							onClick={() => handleDetail(rowId)}
						/>
					</Tooltip>
					<Tooltip title="edit">
						<Button
							type="default"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => handleEdit(rowId)}
						/>
					</Tooltip>
					<Popconfirm
						title="Are you sure you want to delete this quiz?"
						okText="Yes"
						placement="topRight"
						onConfirm={() => {
							handleDelete(rowId);
						}}
					>
						<Tooltip title="delete">
							<Button
								loading={rowId === id && isLoading}
								shape="circle"
								danger
								icon={<DeleteOutlined />}
							></Button>
						</Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];

	const { mutate, isLoading } = useDelete("/quizzes");

	const handleDelete = (id) => {
		setId(id);
		mutate(id, {
			onError: (err) => {
				message.error(err.response.data.message);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been deleted!`);
			},
			onSettled: () => setId(null),
		});
	};

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
