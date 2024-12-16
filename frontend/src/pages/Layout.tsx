import { Link, Outlet } from "react-router-dom";
import "../css/nav.css";
import Cookies from "universal-cookie";
import { useState } from "react";

export default function Layout() {
    const cookies = new Cookies();
    const [cartItems, setCartItems] = useState<number>(0);
    function logout() {
        cookies.remove("access_token");
        window.location.reload();
    }
    function login() {
        window.location.href = "/login";
    }
    return <>
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/cart"} className="left">
                <img src="shopping-cart.svg" className="icon" alt="shopping cart"/>
                <span>{cartItems}</span>
            </Link>
            {cookies.get("access_token") ?
            <button onClick={logout}>Logout</button> :
            <button onClick={login}>Login</button>
            }
        </nav>
        <main>
            <Outlet/>
        </main>
    </>
}