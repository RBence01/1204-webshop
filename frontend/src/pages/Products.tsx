import Listing from "../components/Listing";
import { useCartCookie } from "../components/CartCookieContext";
import { useEffect } from "react";

export default function Products() {
    const cartcookie = useCartCookie();

    useEffect(() => {
        cartcookie.getUserData();
    }, []);

    if (cartcookie.user === undefined) return;

    return <Listing addToCart={cartcookie.user != null}/>
}