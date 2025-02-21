import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography, Box, Alert, InputAdornment } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

            const data = await response.json()
            if (response.ok) {
                navigate("/")
            } else {
                setError(data.message || "Something went wrong, please try again.")
            }
        } catch (error) {
            console.log(error);
            setError("Error connecting to the server.")
        }
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    background: "rgba(22, 20, 20, 0.9)",
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: "center",
                    width: "50%",
                    maxWidth: "600px",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        marginBottom: 2,
                        fontFamily: "'Poppins', sans-serif",
                        "&:hover": {
                            color: "#2C6339",
                            transform: "scale(1.1)",
                            transition: "transform 0.3s ease, color 0.3s ease",
                        }
                    }}
                >
                    Register a New Account
                </Typography>

                <form onSubmit={handleRegister}>
                    <TextField
                        label="Name"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: '#fff' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#64656A",
                            color: "#fff",
                            borderRadius: "20px",
                            "& label": {
                                color: "white",
                            },
                            "& .MuiFilledInput-root": {
                                borderRadius: "20px",
                                paddingLeft: "35px",
                                "& fieldset": {
                                    borderColor: "#444",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#137c2c",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#137c2c",
                                    boxShadow: "0 0 10px rgba(19, 124, 44, 0.6)",
                                },
                            },
                            "& input": {
                                color: "white",
                            },
                        }}
                    />

                    <TextField
                        label="Email"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: '#fff' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#64656A",
                            color: "#fff",
                            borderRadius: "20px",
                            "& label": {
                                color: "white",
                            },
                            "& .MuiFilledInput-root": {
                                borderRadius: "20px",
                                paddingLeft: "35px",
                                "& fieldset": {
                                    borderColor: "#444",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#137c2c",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#137c2c",
                                    boxShadow: "0 0 10px rgba(19, 124, 44, 0.6)",
                                },
                            },
                            "& input": {
                                color: "white",
                            },
                        }}
                    />

                    <TextField
                        label="Password"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon sx={{ color: '#fff' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#64656A",
                            color: "#fff",
                            borderRadius: "20px",
                            "& label": {
                                color: "white",
                            },
                            "& .MuiFilledInput-root": {
                                borderRadius: "20px",
                                paddingLeft: "35px",
                                "& fieldset": {
                                    borderColor: "#444",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#137c2c",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#137c2c",
                                    boxShadow: "0 0 10px rgba(19, 124, 44, 0.6)",
                                },
                            },
                            "& input": {
                                color: "white",
                            },
                        }}
                    />

                    {error && (
                        <Alert severity="error" sx={{ marginTop: 2, padding: 1, backgroundColor: '#F44336' }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ marginTop: 3 }}
                    >
                        Register
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => navigate("/")}
                        sx={{
                            marginTop: 2,
                            "&:hover": {
                                backgroundColor: "#1C96C9",
                                borderColor: "black",
                                color: "white",
                            },
                        }}
                    >
                        Already have an account? Login
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Register
