import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { InRoom, Initial } from "./pages";
import { Test } from "./pages/Test";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Initial />,
	},
	{
		path: "/room/:id",
		element: <InRoom />,
	},
	{
		path: "/test",
		element: <Test />,
	},
]);

function App() {
	return (
		<div className="container">
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
}

export default App;
