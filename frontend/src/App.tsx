import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartCookieProvider } from "./components/CartCookieContext";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<CartCookieProvider><Layout /></CartCookieProvider>}>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/products" element={<Products/>} />
				<Route path="/cart" element={<Cart/>} />
			</Route>
		</Routes>
	</BrowserRouter>
}

export default App
