import { Link, Outlet } from "react-router-dom";
import "../css/nav.css";
import Cookies from "universal-cookie";
import { useCartCookie } from "../components/CartCookieContext";
import { useEffect } from "react";

export default function Layout() {
    const cookies = new Cookies();
    const cartcookie = useCartCookie();

    useEffect(() => {
        cartcookie.getUserData();
        cartcookie.updateCookie();
    }, []);
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
            <Link to={"/furaCart"}>Fura Cart</Link>
            <Link to={"/cart"} className="left cartDiv">
                <img src="shopping-cart.svg" className="icon" alt="shopping cart" />
                {cartcookie.cookieValue != 0 && <span>{cartcookie.cookieValue}</span>}
            </Link>
            {cartcookie.user ?
                <button onClick={logout}>Logout</button> :
                <button onClick={login}>Login</button>
            }
            {cartcookie.user && <Link to={"/profile"} style={{marginLeft: "5px"}}>Profile</Link>}
        </nav>
        <main>
            <Outlet />
        </main>
    </>
}