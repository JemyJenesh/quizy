import { message } from "antd";
import {
	useQuestions,
	useCreateQuestion,
	useDeleteQuestion,
	useUpdateQuestion,
} from "api";
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
		const { data: questions } = queryClient.getQueryData("questions");
		const que = questions.find((que) => que.id === id);
		setQuestion(que);
	};

	const { data, isLoading, isFetching, refetch } = useQuestions();
	const { mutate } = useCreateQuestion();
	const { mutate: deleteQuestion } = useDeleteQuestion();
	const { mutate: updateQuestion } = useUpdateQuestion();

	const toggleModal = () => setVisible(!visible);

	const toggleExpand = () => {
		if (data && data.data.length > 0)
			if (expandedRowKeys.length > 0) {
				setExpandedRowKeys([]);
			} else {
				setExpandedRowKeys(data.data.map((d) => d.id));
			}
	};

	const handleCreate = (value, afterCreate) => {
		mutate(value, {
			onError: (err) => {
				message.error(err.response.data.errors.text[0]);
			},
			onSuccess: () => {
				message.success(`New question created!`);
				afterCreate();
			},
		});
	};

	const handleEdit = (data, afterUpdate) => {
		updateQuestion(data, {
			onError: (err) => {
				const errors = err.response.data.errors;

				Object.keys(errors).forEach((key) => {
					message.error(errors[key][0]);
				});
			},
			onSuccess: () => {
				message.success(`The question has been updated!`);
				afterUpdate();
			},
		});
	};

	const handleDelete = (id) => {
		deleteQuestion(id, {
			onSuccess: () => {
				message.success(`The question has been deleted!`);
			},
		});
	};

	return (
		<AppLayout>
			<QuestionsCreateModal
				visible={visible}
				handleClose={toggleModal}
				handleCreate={handleCreate}
			/>
			{question && (
				<QuestionsEditModal
					question={question}
					handleClose={() => setQuestion(null)}
					handleEdit={handleEdit}
				/>
			)}
			<Header
				title="Questions"
				handleRefresh={refetch}
				handleCreate={toggleModal}
			/>
			<QuestionsTable
				data={!isLoading && data.data}
				loading={isLoading || isFetching}
				handleDelete={handleDelete}
				handleEdit={openEditModal}
				expandedRowKeys={expandedRowKeys}
				toggleExpand={toggleExpand}
				expandRow={expandRow}
			/>
		</AppLayout>
	);
};

export default Questions;
