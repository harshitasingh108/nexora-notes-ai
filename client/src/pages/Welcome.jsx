function Welcome() {
    return (
        <div className="relative h-screen flex items-center justify-between bg-black text-white px-10 overflow-hidden">


            <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
            <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>


            <div className="max-w-xl z-10">
                <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                    Nexora <span className="text-purple-400">Notes AI</span>
                </h1>

                <p className="text-lg text-gray-300 mb-8">
                    Transform your thoughts into powerful ideas with AI-driven note management.
                </p>

                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-110 transition shadow-xl">
                    Get Started
                </button>
            </div>


            <div className="z-10 hidden md:block">
                <img
                    src="image.png"
                    alt="AI"
                    className="w-[400px] animate-bounce"
                />
            </div>

        </div>
    );
}

export default Welcome;