import Cookies from "universal-cookie"
import CartListing from "../components/CartListing";

export default function Cart() {
    const cookies = new Cookies();
    const cart: {[key: number]: number} = cookies.get("cart");

    return <>
        <CartListing cart={cart}/>
    </>
}