import { useEffect, useState } from "react";
import "../css/cartlisting.css";
import { useCartCookie } from "./CartCookieContext";
import { Product } from "../types";

export default function CartListing({cart}: {cart: {[key: number]: number}}) {
    const cartcookie = useCartCookie();

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
    
    function calculateTotal() {
        if (!products) return;
        let total = 0;
        for (let e of products) {
            if (cart[e.sku]) total += e.price * cart[e.sku];
        }
        return Math.round(total * 100) / 100;
    }

    function changeAmount(event: any) {
        if (!products) return;
        const sku = event.target.parentElement.parentElement.parentElement.dataset.sku;
        if (!sku) return;
        const value = event.target.dataset.direction == "+" ? 1 : -1;
        if (value === 1) cartcookie.add(sku);
        else cartcookie.decrease(sku);
        cart[sku] += value;
        if (cart[sku] == 0) delete cart[sku];
    }

    function empty() {
        cartcookie.deleteAll();
        cart = {};
        setProducts([]);
    }

    console.log(Object.entries(cart).length)

    if (Object.entries(cart).length == 0 || products.length == 0) return <div>Cart is empty</div>;
    
    return <>
        <table className="cartlisting">
            <thead>
                <tr>
                    <th colSpan={5}>
                        <h2>Cart</h2>
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.filter(e => cart[e.sku]).map((e) => <tr key={e.sku} data-sku={e.sku}>
                    <td><img src={e.img} alt={e.name} /></td>
                    <td>{e.name}</td>
                    <td>
                        <div className="amount">
                            <button data-direction="+" onClick={changeAmount}>⮝</button>
                            <span>{cart[e.sku]}</span>
                            <button data-direction="-" onClick={changeAmount}>⮟</button>
                        </div>
                    </td>
                    <td className="prices">
                        <span className="price">{e.price}</span>
                        {e.discount && <span className="discount">{e.discount}</span>}
                    </td>
                </tr>)}
                <tr>
                    <td><button className="emptyCart" onClick={empty}>empty cart</button></td>
                    <td></td>
                    <td></td>
                    <td className="total">{calculateTotal()}</td>
                </tr>
            </tbody>
        </table>
    </>
}