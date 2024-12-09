import { Link, Outlet, useNavigate } from "react-router-dom";
import "../css/nav.css";
import Cookies from "universal-cookie";

export default function Layout() {
    const navigate = useNavigate();
    function logout() {
        const cookies = new Cookies();
        cookies.remove("access_token");
        navigate("/");  
    }
    return <>
        <nav>
            <Link to={"/"}>alma</Link>
            <button className="left" onClick={logout}>Logout</button>
        </nav>
        <Outlet/>
    </>
}