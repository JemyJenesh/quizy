import { useEffect } from "react";
import { routes } from "common";
import { AuthRoute, GuestRoute } from "components";
import { useDispatch } from "react-redux";
import { checkAuth } from "store/authSlice";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<QueryClientProvider client={queryClient}>
			{routes.map((route) =>
				route.auth ? (
					<AuthRoute key={route.name} route={route} />
				) : (
					<GuestRoute key={route.name} route={route} />
				)
			)}
		</QueryClientProvider>
	);
}

export default App;
