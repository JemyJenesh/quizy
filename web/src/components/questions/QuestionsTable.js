import {
	Table,
	Button,
	Input,
	Space,
	Tooltip,
	Popconfirm,
	Tag,
	message,
} from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	CaretRightOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { useDelete } from "api";

const QuestionsTable = ({
	data,
	expandedRowKeys,
	toggleExpand,
	expandRow,
	loading,
	handleEdit,
}) => {
	const expandedText =
		expandedRowKeys.length > 0 ? "Shrink table rows" : "Expand table rows";
	const [search, setSearch] = useState("");
	const [id, setId] = useState(null);
	const columns = [
		{
			title: "Question",
			dataIndex: "text",
			render: (text) => (
				<Highlighter
					autoEscape
					highlightClassName="text-highlight"
					searchWords={[search]}
					textToHighlight={text}
				/>
			),
		},
		{
			title: "Answer",
			dataIndex: "answer",
			render: (answer) => <Tag color="green">{answer}</Tag>,
		},
		{
			title: "Category",
			dataIndex: "category",
			render: (category) => <Tag color="geekblue">{category}</Tag>,
		},
		{
			title: "Actions",
			dataIndex: "id",
			align: "right",
			render: (rowId) => (
				<Space>
					<Tooltip title="edit">
						<Button
							type="default"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => handleEdit(rowId)}
						/>
					</Tooltip>
					<Popconfirm
						title="Are you sure you want to delete this question?"
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
	const { mutate, isLoading } = useDelete("/questions");

	const handleDelete = (id) => {
		setId(id);
		mutate(id, {
			onError: (err) => {
				message.error(err.response.data.message);
			},
			onSuccess: () => {
				message.success(`The question has been deleted!`);
			},
			onSettled: () => setId(null),
		});
	};
	return (
		<div style={{ padding: "1rem 2rem" }}>
			<div
				style={{
					marginBottom: 16,
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Input
					placeholder="Search by name"
					prefix={<SearchOutlined />}
					style={{ width: 300 }}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button onClick={toggleExpand}>{expandedText}</Button>
			</div>
			<Table
				rowKey="id"
				loading={loading}
				size="small"
				columns={columns}
				dataSource={
					data &&
					data.filter(
						(d) => d.text.toLowerCase().indexOf(search.toLowerCase()) > -1
					)
				}
				pagination={false}
				expandable={{
					defaultExpandedRowKeys: [2],
					expandedRowKeys,
					expandedRowRender: (record) => (
						<div style={{ padding: "0 3rem" }}>
							{record.options.map(({ id, text, is_correct }) => (
								<Tag key={id} color={is_correct ? "green" : "default"}>
									{text}
								</Tag>
							))}
						</div>
					),

					expandIcon: ({ expanded, record }) => (
						<CaretRightOutlined
							rotate={expanded ? 90 : 0}
							onClick={() => {
								expandRow(record.id);
							}}
						/>
					),
				}}
			/>
		</div>
	);
};

export default QuestionsTable;
