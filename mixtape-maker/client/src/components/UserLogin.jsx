import {useState} from "react";

function Login() {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
        alert("Username and password are required fields");
        return;
    }

    const userData = {username, password};

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login successful!")
        } else {
            alert(result.error || "Login failed.");
        }
    }   catch (error) {
        alert("Error in connecting to the server.");
        console.error(error);
    }
}

return (
    <div>
       <h1>User Login</h1> 
       <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Log In</button>
       </form>
    </div>

)


}

export default Login;
