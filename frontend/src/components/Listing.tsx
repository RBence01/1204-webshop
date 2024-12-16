import { useEffect, useState } from "react";
import { Product } from "../types";
import Card from "./Card";
import "../css/listing.css"

export default function Listing({addToCart = true} : {addToCart?: boolean}) {
    const [data, setData] = useState<Product[] | undefined>(undefined);

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:3000/products");
            if (!response.ok) {
                console.warn("Failed to fetch data!");
                return;
            }
            setData(await response.json());
        }
        load();
    }, []);

    if (!data) return;

    return <>
        <div className="listing">
            {data.map(e => <Card product={e} key={e.sku} addToCart={addToCart}/>)}
        </div>
    </>
}