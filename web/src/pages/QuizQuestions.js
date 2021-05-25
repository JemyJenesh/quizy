import {
	Alert,
	Button,
	Input,
	message,
	PageHeader,
	Spin,
	Table,
	Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCreate, useIndex, useShow } from "api";
import { PageLoader } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const columns = [
	{
		title: "Question",
		dataIndex: "text",
		width: "60%",
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
];

const QuizQuestions = ({ history }) => {
	const { id } = useParams();
	const [search, setSearch] = useState("");
	const { data, isLoading } = useShow("/quizzes", id);
	const { data: questions, isLoading: questionLoading } =
		useIndex("/questions");
	const { mutate, isLoading: isSaving } = useCreate("/quiz-questions");

	const [selectedRows, setSelectedRows] = useState(
		data && data.data.quizQuestions.map((d) => d.id)
	);

	const onSelectChange = (selectedRowKeys) => {
		setSelectedRows(selectedRowKeys);
	};

	const rowSelection = {
		selectedRows,
		onChange: onSelectChange,
		defaultSelectedRowKeys: selectedRows,
	};

	const handleSave = () => {
		mutate(
			{ quiz_id: id, questions: selectedRows },
			{
				onSuccess: () => {
					message.success("Questions updated!");
					history.goBack();
				},
			}
		);
	};

	useEffect(() => {
		data && setSelectedRows(data.data.quizQuestions.map((d) => d.id));
	}, [data]);

	if (isLoading || questionLoading)
		return (
			<>
				<PageLoader />
			</>
		);

	return (
		<Spin spinning={isSaving}>
			<Alert
				message="Check mark to include question to the quiz. Uncheck to remove."
				banner
				type="info"
			/>
			<PageHeader
				title={data.data.name}
				subTitle={data.data.description}
				onBack={() => history.goBack()}
				extra={[
					<Button key="save" type="primary" onClick={handleSave}>
						Save
					</Button>,
				]}
			/>
			<div style={{ padding: "1rem 2rem" }}>
				<Input
					placeholder="Search by question or category"
					prefix={<SearchOutlined />}
					style={{ width: 300, marginBottom: "1rem" }}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Table
					rowKey="id"
					size="small"
					columns={columns}
					loading={questionLoading}
					dataSource={
						questions &&
						questions.data.filter(
							(d) =>
								d.text.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
								d.category.toLowerCase().indexOf(search.toLowerCase()) > -1
						)
					}
					rowSelection={rowSelection}
					pagination={false}
				/>
			</div>
		</Spin>
	);
};

export default QuizQuestions;
