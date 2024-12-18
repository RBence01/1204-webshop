import { Product } from "../types";
import "../css/cartlisting.css";

export default function CartListing({products, skuCount}: {products: Product[], skuCount: {[key: number]: number}}) {
    
    function calculateTotal() {
        let total = 0;
        for (let e of products) {
            total += e.price * skuCount[e.sku];
        }
        return total;
    }

    function changeAmount(event: any) {
        const value = event.target.dataset.direction == "plus" ? 1 : -1;
        
    }
    
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
                {products.map((e) => <tr key={e.sku}>
                    <td><img src={e.img} alt={e.name} /></td>
                    <td>{e.name}</td>
                    <td>
                        <div className="amount">
                            <button data-direction="+" onClick={changeAmount}>⮝</button>
                            <span>{skuCount[e.sku]}</span>
                            <button data-direction="-" onClick={changeAmount}>⮟</button>
                        </div>
                    </td>
                    <td className="prices">
                        <span className="price">{e.price}</span>
                        {e.discount && <span className="discount">{e.discount}</span>}
                    </td>
                </tr>)}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="total">{calculateTotal()}</td>
                </tr>
            </tbody>
        </table>
    </>
}