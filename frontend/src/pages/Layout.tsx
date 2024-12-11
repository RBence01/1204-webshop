import { Link, Outlet } from "react-router-dom";
import "../css/nav.css";
import Cookies from "universal-cookie";

export default function Layout() {
    const cookies = new Cookies();
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
            {cookies.get("access_token") ?
            <button className="left" onClick={logout}>Logout</button> :
            <button className="left" onClick={login}>Login</button>
            }
        </nav>
        <main>
            <Outlet/>
        </main>
    </>
}