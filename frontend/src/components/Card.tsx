import { Product } from "../types";
import "../css/card.css";
import { useCartCookie } from "./CartCookieContext";

export default function Card({product, addToCart = false}: {product: Product, addToCart?: boolean}) {
    const cartcookie = useCartCookie();
    function add() {
        console.log(product.sku);
        console.log(cartcookie.cookieValue);
        cartcookie.add(product.sku);
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