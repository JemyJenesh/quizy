import {
	Badge,
	Button,
	Col,
	Divider,
	Progress,
	Row,
	Space,
	Tag,
	Typography,
} from "antd";
import {
	CheckCircleOutlined,
	SyncOutlined,
	CloseCircleOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";

import "./Example.css";

const Example = ({ question, player, turn }) => {
	const returnIndexToAlphabhet = (index) => ["A", "B", "C", "D"][index];
	return (
		<div style={{ minHeight: "100vh" }}>
			<div className="container">
				<Row>
					<Col flex={1}>
						<Progress percent={50} showInfo={false} size="small" />
					</Col>
					<Col flex={0}>
						<Typography.Title
							level={5}
							style={{ width: "2.5rem", textAlign: "end", marginBottom: 0 }}
						>
							15s
						</Typography.Title>
					</Col>
				</Row>
			</div>
			<Divider className="title" />
			<div className="container">
				<Row>
					<Col xs={0} lg={8}></Col>
					<Col xs={24} lg={16}>
						<Row style={{ width: "100%" }}>
							<Space direction="vertical" size="large">
								<Row align="middle">
									<Col flex={0}>
										<Button
											size="large"
											shape="circle"
											icon={
												<UnorderedListOutlined style={{ color: "#2db7f5" }} />
											}
										/>
									</Col>
									<Col flex={1}>
										<Typography.Title
											type="secondary"
											level={3}
											className="title text-center"
										>
											{player?.name}
										</Typography.Title>
									</Col>
									<Col flex={0}>
										<Badge
											count={player?.score}
											overflowCount={999}
											className="score"
										/>
									</Col>
								</Row>
								<Row justify="space-between" gutter={[24, 24]}>
									<Col xs={24}>
										<Typography.Title level={3} className="title text-center">
											{question?.text}
										</Typography.Title>
									</Col>
									{question?.options.map((option, idx) => (
										<Col key={option.id} xs={24} md={12}>
											<Tag className="tag">
												{returnIndexToAlphabhet(idx)}. {option.text}
											</Tag>
										</Col>
									))}
									<Col xs={24} md={12}>
										<Tag
											className="tag"
											icon={<CheckCircleOutlined />}
											color="success"
										>
											B. Kathmandu
										</Tag>
									</Col>
									<Col xs={24} md={12}>
										<Tag
											className="tag"
											icon={<SyncOutlined spin />}
											color="processing"
										>
											C. Hetauda
										</Tag>
									</Col>
									<Col xs={24} md={12}>
										<Tag
											className="tag"
											icon={<CloseCircleOutlined />}
											color="error"
										>
											D. Pokhara
										</Tag>
									</Col>
									<Col flex="0">
										<Button size="large">Pass</Button>
									</Col>
									<Col flex="0">
										<Button size="large" type="primary">
											Submit
										</Button>
									</Col>
								</Row>
							</Space>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Example;
