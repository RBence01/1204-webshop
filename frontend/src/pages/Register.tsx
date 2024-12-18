import Cookies from "universal-cookie"
import "../css/login.css"
import { useState } from "react";

export default function Register() {
    const cookies = new Cookies();

    if (cookies.get("access_token")) {
        window.location.href = "/";
    }

    const [status, setStatus] = useState<string | undefined>(undefined);

    async function submit(event: any) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const response = await fetch('http://localhost:3000/users', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: data.get("username"),
                password: data.get("password"),
                email: data.get("email"),
                promotionalEmails: data.get("promotionalEmails") == "on",
                type: "customer"
            })
        });
        if (!response.ok) {
            setStatus("Failed to register!");
            return;
        }
        cookies.set("access_token", (await response.json()).access_token);
        window.location.href = "/";
    }

    return <form className="login" onSubmit={submit}>
        <label>
            Username
            <input type="text" name="username" required/>
        </label>
        <label>
            Email
            <input type="email" name="email" required/>
        </label>
        <label>
            Password
            <input type="password" name="password" required/>
        </label>
        <label>
            Recieve emails:
            <input type="checkbox" name="promotionalEmails" />
        </label>
        <input type="submit" value="Register" />
        {status && <p className="alert-error appear">{status}</p> }
    </form>
}