import { Product } from "../types";

export default function CartCard({product, amount}: {product: Product, amount: number}) {
    return <>
        <div className="cartcard">
            <div>
                <img src={product.img} alt={"Image of " + product.name}/>
                <p>{product.name}</p>
            </div>
            <div>
                <p className="price">{product.discount ? product.discount : product.price}</p>
                <p className="amount">{amount}</p>
            </div>

        </div>
    </>
}