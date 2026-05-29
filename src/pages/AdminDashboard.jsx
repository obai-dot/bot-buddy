import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [bots, setBots] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH BOTS
  const fetchBots = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setBots(data);
  };

  // FETCH MESSAGES
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMessages(data);
  };

  useEffect(() => {
    fetchBots();
    fetchMessages();
  }, []);

  // DELETE BOT
  const handleDelete = async (bot) => {
    if (!window.confirm("Delete this bot?")) return;

    if (bot.menu) {
      try {
        const filePath = bot.menu.split("/menus/")[1];
        await supabase.storage.from("menus").remove([filePath]);
      } catch {}
    }

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", bot.id);

    if (!error) fetchBots();
  };

  // DELETE MESSAGE
  const handleDeleteMessage = async (message) => {
    if (!window.confirm("Delete this message?")) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", message.id);

    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
    }
  };

  const filteredBots = bots.filter((b) =>
    b.email.toLowerCase().includes(search.toLowerCase())
  );
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl mb-6">Admin Dashboard</h1>

      {/* SEARCH */}
      <input
        placeholder="Search by email..."
        className="mb-8 p-3 rounded bg-white/10 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* BOTS */}
      <h2 className="text-2xl mb-4">Bots</h2>

      <div className="grid gap-6 mb-12">

        {filteredBots.map((b) => (
          <div key={b.id} className="bg-white/10 p-6 rounded-xl">

            <p><strong>Email:</strong> {b.email}</p>

            {b.restaurant_name && (
              <p>Restaurant: {b.restaurant_name}</p>
            )}

            {b.clinic_name && (
              <p>Clinic: {b.clinic_name}</p>
            )}

            {b.gym_name && (
              <p>Gym: {b.gym_name}</p>
            )}

            {/* 🔥 FIX 1: FULL IMAGE (NO CROPPING) */}
           {b.menu && (
  <div className="mt-4">

    {/* SMALL PREVIEW IMAGE */}
    <img
      src={b.menu}
      alt="menu"
      onClick={() => setSelectedImage(b.menu)}
      className="w-full max-h-40 object-contain rounded-lg border border-white/10 cursor-pointer hover:scale-[1.02] transition"
    />

    <p className="text-xs text-white/50 mt-2">
      Click image to enlarge
    </p>

  </div>
)}
            <button
              onClick={() => handleDelete(b)}
              className="mt-4 bg-red-500 px-6 py-2 rounded-full"
            >
              Delete Bot
            </button>

          </div>
        ))}
      </div>

      {/* MESSAGES */}
      <h2 className="text-2xl mb-4">Customer Messages</h2>

      <div className="grid gap-4">
        {messages.map((m) => (
          <div key={m.id} className="bg-white/10 p-5 rounded-xl">

            <p><strong>{m.full_name}</strong></p>
            <p>{m.email}</p>

            <p className="text-blue-400">{m.subject}</p>

            {/* 🔥 FIX 2: FULL TEXT (NO CUTTING) */}
            <p className="mt-2 text-white/80 break-words whitespace-pre-wrap">
              {m.message}
            </p>

            <button
              onClick={() => handleDeleteMessage(m)}
              className="mt-4 bg-red-500 px-4 py-2 rounded-full"
            >
              Delete Message
            </button>

          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");
          navigate("/login");
        }}
        className="mt-10 bg-red-600 px-6 py-3 rounded-full"
      >
        Logout
      </button>

      {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]"
    onClick={() => setSelectedImage(null)}
  >
    <img
      src={selectedImage}
      className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
    />
  </div>
)}

    </div>
  );
}