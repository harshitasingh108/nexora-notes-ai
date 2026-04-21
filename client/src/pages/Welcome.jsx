import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-black text-white overflow-hidden px-6">

            {/* 🔥 Background Glow */}
            <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
            <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

            {/* 🔥 Main Content */}
            <div className="z-10 text-center max-w-xl">

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Nexora <span className="text-purple-400">Notes AI</span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-300 mb-8">
                    Transform your thoughts into powerful ideas with AI-driven note management.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4">

                    <button
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-110 transition shadow-xl"
                    >
                        Get Started 🚀
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 rounded-full font-semibold bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition shadow-lg"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-6 py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-black transition"
                    >
                        Signup ✨
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Welcome;