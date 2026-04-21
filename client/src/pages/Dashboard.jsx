import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const navigate = useNavigate();

    // 🔥 BACKEND URL (IMPORTANT)
    const BASE_URL = "https://nexora-notes-ai.onrender.com";

    // 🔐 Protect Dashboard
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    // 🔥 Fetch Notes
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/notes`);
            setNotes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ➕ Add Note
    const addNote = async () => {
        if (!input.trim()) return;

        try {
            await axios.post(`${BASE_URL}/notes`, {
                title: input,
            });

            setInput("");
            fetchNotes();
        } catch (err) {
            console.log(err);
        }
    };

    // ❌ Delete Note
    const deleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.log(err);
        }
    };

    // 🤖 Chat (AI)
    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMsg = message;

        setChat([...chat, { text: userMsg, type: "user" }]);
        setMessage("");

        try {
            const res = await axios.post(`${BASE_URL}/chat`, {
                message: userMsg,
            });

            setChat((prev) => [
                ...prev,
                { text: res.data.reply, type: "ai" },
            ]);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="h-screen flex bg-black text-white">

            {/* LEFT - NOTES */}
            <div className="w-1/2 p-5 border-r border-white/10 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Your Notes 📝</h2>

                <div className="flex gap-2 mb-4">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Write a note..."
                        className="flex-1 p-2 rounded bg-white/20 outline-none"
                    />

                    <button
                        onClick={addNote}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded hover:scale-105 transition"
                    >
                        Add
                    </button>
                </div>

                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="bg-white/10 p-3 rounded mb-2 flex justify-between items-center"
                    >
                        <span>{note.title}</span>

                        <button
                            onClick={() => deleteNote(note._id)}
                            className="text-red-400 hover:text-red-600"
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>

            {/* RIGHT - CHAT */}
            <div className="w-1/2 p-5 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">AI Assistant 🤖</h2>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                        className="bg-red-500 px-4 py-2 rounded-lg"
                    >
                        Logout 🚪
                    </button>
                </div>

                <div className="flex-1 bg-white/10 p-3 rounded mb-3 overflow-y-auto">
                    {chat.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${msg.type === "user" ? "text-right" : "text-left"}`}
                        >
                            <span
                                className={`inline-block px-3 py-2 rounded ${msg.type === "user"
                                        ? "bg-purple-500"
                                        : "bg-gray-700"
                                    }`}
                            >
                                {msg.text}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask AI..."
                        className="flex-1 p-2 rounded bg-white/20 outline-none"
                    />

                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded hover:scale-105 transition"
                    >
                        Send
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;