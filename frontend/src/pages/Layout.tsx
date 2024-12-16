import { Link, Outlet } from "react-router-dom";
import "../css/nav.css";
import Cookies from "universal-cookie";
import { useCartCookie } from "../components/CartCookieContext";

export default function Layout() {
    const cookies = new Cookies();
    const cartcookie = useCartCookie();
    function logout() {
        cookies.remove("access_token");
        window.location.reload();
    }
    function login() {
        return;
        window.location.href = "/login";
    }

    cartcookie.updateCookie();
    return <>
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/cart"} className="left cartDiv">
                <img src="shopping-cart.svg" className="icon" alt="shopping cart" />
                {cartcookie.cookieValue != 0 && <span>{cartcookie.cookieValue}</span>}
            </Link>
            {cookies.get("access_token") ?
                <button onClick={logout}>Logout</button> :
                <button onClick={login}>Login</button>
            }
        </nav>
        <main>
            <Outlet />
        </main>
    </>
}