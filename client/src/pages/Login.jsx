import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex items-center justify-center bg-black text-white">

            {/* Glow background */}
            <div className="absolute w-[400px] h-[400px] bg-purple-600 blur-3xl opacity-20 top-10 left-10"></div>
            <div className="absolute w-[300px] h-[300px] bg-blue-500 blur-3xl opacity-20 bottom-10 right-10"></div>

            {/* Card */}
            <div className="z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px]">

                <h2 className="text-3xl font-semibold mb-2 text-center">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-400 mb-6 text-sm">
                    Login to continue using Nexora AI
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
                    onClick={() => navigate("/dashboard")}
                >
                    Login 🔐
                </button>

            </div>

        </div>
    );
}

export default Login;