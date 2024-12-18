import { useEffect, useState } from "react";
import Cookies from "universal-cookie"
import { Product } from "../types";
import CartListing from "../components/CartListing";

export default function Cart() {
    const cookies = new Cookies();
    const cart: {[key: number]: number} = cookies.get("cart");
    if (!cart) return <h1>Your cart is empty!</h1>;
    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:3000/products/skus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Object.keys(cart))
            });
            setProducts(await response.json());
        }
        load();
    }, []);

    if (!products) return;

    return <>
        <CartListing products={products} skuCount={cart}/>
    </>
}