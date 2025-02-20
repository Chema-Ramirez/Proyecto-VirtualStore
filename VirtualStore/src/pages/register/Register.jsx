import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Register.css'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3005/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/");
            } else {
                setError(data.message || "Something went wrong, please try again.")
            }
        } catch (error) {
            console.log(error)
            setError("Error connecting to the server.")
        }
    }

    return (
        <div className="register-page">
            <form onSubmit={handleRegister} className="form-container">
                <h2>Register a New Account</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-btn">Register</button>
                <button type="button" onClick={() => navigate("/")} className="login-link">Already have an account? Login</button>
            </form>
        </div>
    )
}

export default Register;
