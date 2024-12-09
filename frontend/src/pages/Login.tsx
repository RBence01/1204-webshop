import { FormEvent } from "react";
import Cookies from "universal-cookie";

export default function Login() {
    const cookies = new Cookies();

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
        if (response.status == 401) {
            return;
        }
        cookies.set("access_token", (await response.json()).access_token);
    }

    return <form onSubmit={submit}>
        <label>
            Username
            <input type="text" name="username" id="username" required />
        </label>
        <label>
            Password
            <input type="password" name="password" id="password" required />
        </label>
        <input type="submit" value="Submit" />
    </form>
}
