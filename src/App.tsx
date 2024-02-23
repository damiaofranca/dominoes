import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { InRoom, Initial } from "./pages";
import { Test } from "./pages/Test";
import { GameProvider } from "./providers/Game";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Initial />,
	},
	{
		path: "/room/:room",
		element: <InRoom />,
	},
	{
		path: "/test",
		element: <Test />,
	},
]);

function App() {
	return (
		<GameProvider>
			<div className="container">
				<RouterProvider router={router} />
				<ToastContainer />
			</div>
		</GameProvider>
	);
}

export default App;
