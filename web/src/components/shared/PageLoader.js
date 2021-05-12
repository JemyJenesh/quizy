import { Spin } from "antd";

const PageLoader = () => {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				height: "100%",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Spin size="large" />
		</div>
	);
};

export default PageLoader;
