import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if (!name || !email || !password) {
            alert("All fields required ❗");
            return;
        }

        try {
            await axios.post("http://localhost:5000/register", {
                name,
                email,
                password,
            });

            alert("Signup successful 🎉");
            navigate("/login");

        } catch (err) {
            console.log(err.response?.data);
            alert("Signup failed ❌");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-80 text-center text-white shadow-lg">

                <h2 className="text-3xl font-bold mb-6">Create Account ✨</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignup}
                    className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
                >
                    Signup 🚀
                </button>

                <p
                    className="mt-4 text-sm cursor-pointer hover:underline"
                    onClick={() => navigate("/login")}
                >
                    Already have an account? Login
                </p>

            </div>
        </div>
    );
}