import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { InRoom, Initial } from "./pages";
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
