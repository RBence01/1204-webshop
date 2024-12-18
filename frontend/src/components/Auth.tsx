import { useEffect } from "react";
import Login from "../pages/Login";
import { useCartCookie } from "./CartCookieContext";

export default function Auth({children} : { children: React.ReactElement }) {
    const cartcookie = useCartCookie();

    useEffect(() =>{
        cartcookie.getUserData();
    }, []);

    
    if (cartcookie.user === undefined) return;

	if (cartcookie.user === null) {
		window.location.href = "/login";
	}
	return children;
};