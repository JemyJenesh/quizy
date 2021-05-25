import { useIndex } from "api";
import {
	AppLayout,
	QuestionsEditModal,
	QuestionsCreateModal,
	QuestionsTable,
	Header,
} from "components";
import { useState } from "react";
import { useQueryClient } from "react-query";

const Questions = () => {
	const queryClient = useQueryClient();
	const [visible, setVisible] = useState(false);

	const [expandedRowKeys, setExpandedRowKeys] = useState([]);

	const expandRow = (key) => {
		if (expandedRowKeys.indexOf(key) < 0)
			setExpandedRowKeys((prev) => [...prev, key]);
		else setExpandedRowKeys((prev) => prev.filter((k) => k !== key));
	};

	const [question, setQuestion] = useState(null);
	const openEditModal = (id) => {
		const { data: questions } = queryClient.getQueryData("/questions");
		const que = questions.find((que) => que.id === id);
		setQuestion(que);
	};

	const { data, isLoading, isFetching, refetch } = useIndex("/questions");

	const toggleModal = () => setVisible(!visible);

	const toggleExpand = () => {
		if (data && data.data.length > 0)
			if (expandedRowKeys.length > 0) {
				setExpandedRowKeys([]);
			} else {
				setExpandedRowKeys(data.data.map((d) => d.id));
			}
	};

	return (
		<AppLayout>
			<QuestionsCreateModal visible={visible} handleClose={toggleModal} />
			<QuestionsEditModal
				question={question}
				handleClose={() => setQuestion(null)}
			/>
			<Header
				title="Questions"
				handleRefresh={refetch}
				handleCreate={toggleModal}
			/>
			<QuestionsTable
				data={!isLoading && data.data}
				loading={isLoading || isFetching}
				handleEdit={openEditModal}
				expandedRowKeys={expandedRowKeys}
				toggleExpand={toggleExpand}
				expandRow={expandRow}
			/>
		</AppLayout>
	);
};

export default Questions;
