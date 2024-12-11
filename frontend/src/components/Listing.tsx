import { useEffect, useState } from "react";
import { Product } from "../types";

export default function Listing() {
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
        
    </>
}