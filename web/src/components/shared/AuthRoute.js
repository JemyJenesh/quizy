import { useSelector } from "react-redux";
import { selectIsAppLoading, selectUser } from "store/authSlice";
import { Route, Redirect } from "react-router";
import { AppLoader } from "components";

const AuthRoute = ({ route }) => {
	const { name, component: Component, path } = route;
	const user = useSelector(selectUser);
	const isAppLoading = useSelector(selectIsAppLoading);

	return (
		<Route
			exact
			name={name}
			path={path}
			render={(props) =>
				isAppLoading ? (
					<AppLoader />
				) : user ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default AuthRoute;
