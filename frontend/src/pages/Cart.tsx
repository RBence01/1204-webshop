import { useEffect, useState } from "react";
import Cookies from "universal-cookie"
import { Product } from "../types";
import Card from "../components/Card";
import CartCard from "../components/CartCard";

export default function Cart() {
    const cookies = new Cookies();
    const skus: [number] = cookies.get("cart");
    if (!skus) return <h1>Your cart is empty!</h1>;
    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:3000/products/skus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({skus})
            });
            setProducts(await response.json());
        }
        load();
    }, []);

    if (!products) return;

    const skusCounts: {[key: number]: number} = {};
    skus.forEach(e => {
        if (skusCounts[e]) skusCounts[e]++;
        else skusCounts[e] = 1;
    });

    return <>
        <div className="cart-items">
            {products.map(e => <CartCard product={e} amount={skusCounts[e.sku]}/>)}
        </div>
    </>
}