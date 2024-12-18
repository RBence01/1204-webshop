import { FormEvent, useEffect, useState } from "react";
import { useCartCookie } from "../components/CartCookieContext";

export default function Profile() {
    const cartcookie = useCartCookie();
    const [status, setStatus] = useState<string | undefined>(undefined);

    useEffect(() => {
        cartcookie.getUserData();
    }, []);

    if (cartcookie.user === undefined) return;

    if (cartcookie.user === null) {
        window.location.href = "/login";
        console.log("redirect");
        return;
    }

    async function change(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const changes: {username?: string, password?: string} = {};

        if (data.get("username")) changes.username = data.get("username") as string;
        if (data.get("password")) changes.password = data.get("password") as string;
        console.log(changes);
        if (Object.entries(changes).length == 0) return;
        const reponse = await fetch("http://localhost:3000/users/" + cartcookie.user?.id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(changes)
        });
        if (!reponse.ok) {
            setStatus("Failed to update!");
        } else {
            setStatus(undefined)
            cartcookie.getUserData();
        }
        (event.target as HTMLFormElement).querySelectorAll("input:not([type='submit'])").forEach(e => (e as HTMLInputElement).value = "");
    }

    return <>
        <h1>Profile</h1>
        <table>
            <tbody>
                <tr>
                    <td>Username:</td>
                    <td>{cartcookie.user.username}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{cartcookie.user.email}</td>
                </tr>
            </tbody>
        </table>

        <h2 style={{marginBottom: "5px"}}>Modify</h2>
        <form onSubmit={change}>
            <label>
                Username
                <input type="text" name="username" />
            </label>
            <label>
                Password
                <input type="password" name="password" />
            </label>
            <input type="submit" value="Change" style={{marginTop: "5px"}}/>
        </form>
        {status && <p className="alert-error appear">{status}</p> }
    </>
}