function Welcome() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

            {/* Heading */}
            <h1 className="text-5xl font-bold mb-4">
                Nexora Notes AI 🚀
            </h1>

            {/* Subtext */}
            <p className="text-lg mb-6 opacity-80">
                Smart notes with AI power
            </p>

            {/* Button */}
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                Get Started
            </button>

        </div>
    );
}

export default Welcome;