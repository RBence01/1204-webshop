import { Product } from "../types";
import "../css/card.css";
import Cookies from "universal-cookie";

export default function Card({product, addToCart = true}: {product: Product, addToCart?: boolean}) {
    const cookies = new Cookies();
    function add() {
        if (cookies.get("cart")) {
            const cart = cookies.get("cart");
            cart.push(product.sku);
            cookies.set("cart", cart);
        } else {
            cookies.set("cart", [product.sku]);
        }
    }
    return <div className="card">
        <img src={product.img} alt={product.name} />
        <p className="cardName">{product.name}</p>
        <p className="prices">
            {product.discount && <span className="discount">{product.discount}</span>}
            <span className="price">{product.price}</span>
        </p>
        {addToCart && <button className="addToCart" onClick={add}>Add to cart</button>}
    </div> 
}