import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button, Alert, Collapse } from "@mui/material";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/v1/auth/register", { username, email, password }); // Make sure this URL matches the server route
            navigate("/login");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <Box width="40%" p="2rem" m="2rem auto" borderRadius={5} boxShadow={5}>
            <Collapse in={error}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>
            <form onSubmit={handleSubmit}>
                <Typography variant="h3">Sign Up</Typography>
                <TextField
                    label="Username"
                    required
                    margin="normal"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    required
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" size="large" sx={{ color: "white", mt: 2 }}>
                    Sign Up
                </Button>
                <Typography mt={2}>
                    Already have an account? <Link to="/login">Please Login</Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Register;
