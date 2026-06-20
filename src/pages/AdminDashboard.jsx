import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [bots, setBots] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ---------------- FETCH NOTIFICATIONS ----------------
  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("FETCH NOTIF ERROR:", error);
      return;
    }

    setNotifications(data || []);
  };

  // ---------------- ADD NOTIFICATION ----------------
  const addNotification = async (message) => {
    const { error } = await supabase
      .from("notifications")
      .insert([{ message }]);

    if (error) {
      console.log("ADD NOTIF ERROR:", error);
      return;
    }

    fetchNotifications();
  };

  // ---------------- DELETE ALL NOTIFICATIONS (FIXED) ----------------
  const clearNotifications = async () => {
    // safer method: get IDs first then delete
    const { data, error } = await supabase
      .from("notifications")
      .select("id");

    if (error) {
      console.log("CLEAR FETCH ERROR:", error);
      return;
    }

    if (!data || data.length === 0) return;

    const ids = data.map((n) => n.id);

    const { error: deleteError } = await supabase
      .from("notifications")
      .delete()
      .in("id", ids);

    if (deleteError) {
      console.log("CLEAR DELETE ERROR:", deleteError);
    }
  };

  // ---------------- FETCH BOTS ----------------
  const fetchBots = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setBots(data || []);
  };

  // ---------------- FETCH MESSAGES ----------------
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMessages(data || []);
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    fetchBots();
    fetchMessages();
    fetchNotifications();
  }, []);

  // ---------------- DELETE BOT ----------------
  const handleDelete = async (bot) => {
  if (!window.confirm("Delete this bot?")) return;

  // 1. DELETE FIRST (and CHECK RESULT PROPERLY)
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", bot.id)
    .select(); // IMPORTANT: ensures delete actually happened

  // 2. HARD CHECK ERROR
  if (error) {
    console.log("DELETE ERROR:", error);
    alert("Delete failed ❌: " + error.message);
    return;
  }

  // 3. CHECK IF ANY ROW WAS ACTUALLY DELETED
  if (!data || data.length === 0) {
    console.log("NO ROW DELETED (possible RLS issue)");
    alert("Delete failed ❌ (no permission or not found)");
    return;
  }

  // 4. ONLY NOW add notification
  const { error: notifError } = await supabase
    .from("notifications")
    .insert([
      { message: `🔴 Bot deleted: ${bot.email}` }
    ]);

  if (notifError) {
    console.log("NOTIFICATION ERROR:", notifError);
  }

  // 5. refresh UI
  fetchBots();
};

  // ---------------- DELETE MESSAGE ----------------
  const handleDeleteMessage = async (message) => {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", message.id);

    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
      await addNotification(`🟡 Message deleted: ${message.email}`);
    }
  };

  // ---------------- TIMER ----------------
  const getTimeLeft = (createdAt) => {
    const end = new Date(createdAt);
    end.setDate(end.getDate() + 30);

    const diff = end - new Date();

    if (diff <= 0) return "Expired ❌";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days} days : ${hours} hours : ${minutes} min`;
  };

  const filteredBots = bots.filter((b) =>
    (b.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
<div
  className="min-h-screen text-white p-10 bg-center bg-no-repeat bg-fixed"
  style={{
    backgroundImage: "url('/adminbg.jpeg')",
    backgroundSize: "130% auto",
  }}
>
      <h1 className="text-4xl mb-6">Admin Dashboard</h1>

      {/* NOTIFICATIONS */}
      <div className="mb-6 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-yellow-500/20 border border-yellow-400 text-yellow-200 p-3 rounded-xl"
          >
            {n.message}
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        className="mb-8 p-3 rounded bg-white/10 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* BOTS */}
      <h2 className="text-2xl mb-4">Bots</h2>

      {filteredBots.map((b) => (
  <div key={b.id} className="bg-white/10 p-5 rounded-xl mb-4">

    <p><strong>Email:</strong> {b.email}</p>

    {/* RESTAURANT */}
    {b.restaurant_name && (
      <>
        <p><strong>Restaurant:</strong> {b.restaurant_name}</p>
        <p><strong>Location:</strong> {b.location}</p>
        <p><strong>Open Days:</strong> {b.open_days}</p>
        <p><strong>Open Time:</strong> {b.open_time}</p>
        <p><strong>Close Time:</strong> {b.close_time}</p>
        <p><strong>Info:</strong> {b.info_restaurant}</p>

        {b.menu && (
          <div className="mt-3">
            <strong>Menu:</strong>
            <div className="bg-white/5 p-3 rounded mt-1 whitespace-pre-wrap">
              {b.menu}
            </div>
          </div>
        )}
      </>
    )}

    {/* CLINIC */}
    {b.clinic_name && (
      <>
        <p><strong>Clinic:</strong> {b.clinic_name}</p>
        <p><strong>Specialty:</strong> {b.clinic_specialty}</p>
        <p><strong>Location:</strong> {b.clinic_location}</p>
        <p><strong>Days:</strong> {b.clinic_days}</p>
        <p><strong>Open:</strong> {b.clinic_open_time}</p>
        <p><strong>Close:</strong> {b.clinic_close_time}</p>
        <p><strong>Info:</strong> {b.clinic_info}</p>
      </>
    )}

    {/* GYM */}
    {b.gym_name && (
      <>
        <p><strong>Gym:</strong> {b.gym_name}</p>
        <p><strong>Location:</strong> {b.gym_location}</p>
        <p><strong>Days:</strong> {b.gym_days}</p>
        <p><strong>Open:</strong> {b.gym_open_time}</p>
        <p><strong>Close:</strong> {b.gym_close_time}</p>
        <p><strong>Bundles:</strong> {b.gym_bundles}</p>
        <p><strong>Info:</strong> {b.gym_info}</p>
      </>
    )}

    <p className="text-green-400 mt-3">
      Subscription: {getTimeLeft(b.created_at)}
    </p>

    <button
      onClick={() => handleDelete(b)}
      className="mt-3 bg-red-500 px-4 py-2 rounded"
    >
      Delete Bot
    </button>

  </div>
))}

      {/* MESSAGES */}
      <h2 className="text-2xl mt-8 mb-4">Messages</h2>

      {messages.map((m) => (
        <div key={m.id} className="bg-white/10 p-5 rounded-xl mb-4">

          <p>{m.full_name}</p>
          <p>{m.email}</p>
          <p>{m.message}</p>

          <button
            onClick={() => handleDeleteMessage(m)}
            className="mt-3 bg-red-500 px-4 py-2 rounded"
          >
            Delete Message
          </button>

        </div>
      ))}

      {/* LOGOUT */}
      <button
        onClick={async () => {
          await clearNotifications(); // 🔥 FIXED FIRST

          await supabase.auth.signOut();

          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");

          navigate("/login");
        }}
        className="mt-10 bg-red-600 px-6 py-3 rounded"
      >
        Logout
      </button>

    </div>
  );
}