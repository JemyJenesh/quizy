import { Button, PageHeader, Tooltip } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useQuiz } from "api";
import { AppLayout, PageLoader, QuizQuestionsTable } from "components";
import { useState } from "react";
import { useParams } from "react-router";

const QuizDetails = ({ history }) => {
	const { id } = useParams();
	const { data, isLoading } = useQuiz(id);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);

	const expandRow = (key) => {
		if (expandedRowKeys.indexOf(key) < 0)
			setExpandedRowKeys((prev) => [...prev, key]);
		else setExpandedRowKeys((prev) => prev.filter((k) => k !== key));
	};
	const toggleExpand = () => {
		if (data && data.data.quizQuestions.length > 0)
			if (expandedRowKeys.length > 0) {
				setExpandedRowKeys([]);
			} else {
				setExpandedRowKeys(data.data.quizQuestions.map((d) => d.id));
			}
	};

	if (isLoading)
		return (
			<AppLayout>
				<PageLoader />
			</AppLayout>
		);

	return (
		<AppLayout>
			<PageHeader
				title={data.data.name}
				subTitle={data.data.description}
				onBack={() => history.goBack()}
				extra={[
					<Tooltip title="Attach questions" key="attach">
						<Button
							type="primary"
							shape="circle"
							icon={<PaperClipOutlined />}
							onClick={() => history.push(`/quizzes/${data.data.id}/questions`)}
						></Button>
					</Tooltip>,
				]}
			/>

			<QuizQuestionsTable
				data={data && data.data.quizQuestions}
				loading={isLoading}
				expandedRowKeys={expandedRowKeys}
				toggleExpand={toggleExpand}
				expandRow={expandRow}
			/>
		</AppLayout>
	);
};

export default QuizDetails;
