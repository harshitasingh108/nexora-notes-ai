import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    // 🔥 Fetch Notes from Backend
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/notes");
            setNotes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // 🔥 Add Note
    const addNote = async () => {
        if (!input.trim()) return;

        try {
            await axios.post("http://localhost:5000/notes", {
                title: input,
            });

            setInput("");
            fetchNotes();
        } catch (err) {
            console.log(err);
        }
    };

    // 🔥 Delete Note
    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.log(err);
        }
    };

    // 🔥 Chat
    const sendMessage = () => {
        if (!message.trim()) return;

        const newChat = [...chat, { text: message, type: "user" }];
        setChat(newChat);
        setMessage("");

        setTimeout(() => {
            setChat((prev) => [
                ...prev,
                { text: "AI response coming soon 🤖", type: "ai" },
            ]);
        }, 500);
    };

    return (
        <div className="h-screen flex bg-black text-white">

            {/* LEFT - NOTES */}
            <div className="w-1/2 p-5 border-r border-white/10 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Your Notes 📝</h2>

                {/* Input */}
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

                {/* Notes List */}
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
                <h2 className="text-xl font-semibold mb-4">AI Assistant 🤖</h2>

                {/* Chat Box */}
                <div className="flex-1 bg-white/10 p-3 rounded mb-3 overflow-y-auto">
                    {chat.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${msg.type === "user" ? "text-right" : "text-left"
                                }`}
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

                {/* Chat Input */}
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
            </div>

        </div>
    );
}

export default Dashboard;