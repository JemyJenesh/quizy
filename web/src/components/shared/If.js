const If = ({ when, children }) => {
	if (!when) return null;
	return <>{children}</>;
};

export default If;
