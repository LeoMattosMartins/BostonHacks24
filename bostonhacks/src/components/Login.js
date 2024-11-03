import "../stylesheets/account.css";
import { useState } from "react";
export default function Login() {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://10.239.69.243:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        })
        if (!response.ok) {
            throw new Error(`Error with error code ${response.status}, reason: ${response.reason}`)
        }
        const token = await response.json()
        localStorage.setItem('token', token.token)
        console.log("SUCCESS!")

    } catch(error) {
        console.error('Error sending data', error)
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={onSubmit}>
      <div id="container">
        <h2>Login to your account</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            type="text"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            id="password"
          />
        </div>
        <button type="submit">Log In</button>
      </div>
    </form>
  );
}
