import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../css/login.css";

export default function Login() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    if (cookies.get("access_token")) {
        if (window.history.length == 0) navigate("/");
        else window.history.back();
        return;
    }
    
    const [status, setStatus] = useState<string | undefined>(undefined);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        console.log(data.get("username"));
        console.log(data.get("password"));
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: data.get("username"),
                password: data.get("password")
            })
        });
        if (!response.ok) {
            if (response.status == 401) {
                setStatus("Wrong username or password!");
            } else if (response.status == 400) {
                setStatus("All fields are required!")
            } else {
                setStatus("Failed to login!");
            }
            return;
        }
            cookies.set("access_token", (await response.json()).access_token);
        navigate(0);
    }

    return <form onSubmit={submit} className="login">
        <label>
            Username
            <input type="text" name="username" id="username" required />
        </label>
        <label>
            Password
            <input type="password" name="password" id="password" required />
        </label>
        <input type="submit" value="Login" />
        {status && <p className="alert-error">{status}</p> }
    </form>
}
