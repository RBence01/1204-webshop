import { Product } from "../types";
import "../css/card.css";

export default function Card({product}: {product: Product}) {
    return <div className="card">
        <img src={product.img} alt={product.name} />
        <p className="cardName">{product.name}</p>
        <p className="prices">
            {product.discount && <span className="discount">{product.discount}</span>}
            <span className="price">{product.price}</span>
        </p>
    </div> 
}