import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });

            // token save
            localStorage.setItem("token", res.data.token);

            alert("Login successful 🔥");
            navigate("/dashboard");

        } catch (err) {
            alert("Login failed ❌");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-80 text-center text-white">

                <h2 className="text-2xl font-bold mb-6">Login 🔐</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded-lg bg-white/20 outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded-lg bg-white/20 outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
                >
                    Login 🚀
                </button>

            </div>
        </div>
    );
}