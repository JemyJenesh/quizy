import { useEffect, useState } from "react";
import { config, routes } from "common";
import { AuthRoute, GuestRoute } from "components";
import { useDispatch } from "react-redux";
import { checkAuth } from "store/authSlice";
import { Route, Switch, useHistory } from "react-router";
import { Result, Button } from "antd";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<Switch>
			{routes.map((route) =>
				route.auth ? (
					<AuthRoute key={route.name} {...route} />
				) : (
					<GuestRoute key={route.name} {...route} />
				)
			)}
			<Route
				render={() => (
					<Result
						status="404"
						title="404"
						subTitle="Sorry, the page you visited does not exist."
						extra={
							<Button
								type="primary"
								onClick={() => history.push(config.homeRoute)}
							>
								Back Home
							</Button>
						}
					/>
				)}
			/>
		</Switch>
	);
}

export default App;
