import Cookies from "universal-cookie";
import Listing from "../components/Listing";
import { useEffect, useState } from "react";

export default function Products() {
    const cookies = new Cookies();

    
	const [status, setStatus] = useState<number>(-1); 
    useEffect(() => {
        fetch('http://localhost:3000/isLoggedIn', {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookies.get("access_token")
            })
        }).then(e => setStatus(e.status));
    }, []);

    if (status == -1) return;

    return <Listing addToCart={status != 401}/>
}