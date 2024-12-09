import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Auth from "./components/Auth";

function App() {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Auth><Home /></Auth>} />
			</Route>
		</Routes>
	</BrowserRouter>
}

export default App
