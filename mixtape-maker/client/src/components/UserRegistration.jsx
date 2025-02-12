import {useState} from "react";

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

   const validation = () => {
    if (!username || !password) {
        alert("Username and password are required fields.")
        return;
    }
    if (password.length < 5) {
        alert("Password must be at least 5 characters long.")
        return false;
    }
    return true;
}
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validation()) {
            return;
        }

        const userData = {username, password};

        try {
            const response = await fetch("http://localhost:5000/register", {
                 method: "POST",
                 headers: {"Content-Type": "application/json"},
                 body: JSON.stringify(userData),
                })
               

          
            if (response.ok) {
                alert("User registered successfully!");
            } else {
                const result = await response.json();
                alert(result.error || "Error occurred");
            }

    }

            catch (error) {
                alert("Failed to register the user.");
                console.error(error);
            }

};

            return (
                <div>
                    <h1>User Registration Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Enter A Username:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Enter A Password:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <button type="submit">Click Here To Register</button>
                    </form>
                </div>
            )
        }
    
    export default Registration