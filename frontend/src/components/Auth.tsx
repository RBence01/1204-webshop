import Cookies from "universal-cookie";
import Login from "../pages/Login";
import { useEffect, useState } from "react";

export default function Auth({children} : { children: React.ReactElement }) {
    const cookies = new Cookies();
    if (!cookies.get("access_token")) return <Login/>

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

	if (status == 401) {
		return <Login />;
	}
	return children;
};