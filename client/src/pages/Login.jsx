function Login() {
    return (
        <div className="h-screen flex items-center justify-center bg-black text-white">


            <div className="absolute w-[400px] h-[400px] bg-purple-600 blur-3xl opacity-30 top-10 left-10"></div>
            <div className="absolute w-[300px] h-[300px] bg-blue-500 blur-3xl opacity-30 bottom-10 right-10"></div>

            <div className="z-10 backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-[350px]">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded bg-white/20 outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded bg-white/20 outline-none"
                />

                <button className="w-full py-3 rounded bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition">
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;