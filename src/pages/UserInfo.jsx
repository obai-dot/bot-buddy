import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function UserInfo() {
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);

  const getUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email);

    if (error) {
      console.log(error);
    } else {
      setBots(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = async (bot) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bot?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", bot.id);

    if (error) {
      console.log(error);
      alert("Delete failed ❌");
    } else {
      await supabase.from("notifications").insert([
        {
          message: `🔴 Bot deleted by ${bot.email} (${
            bot.restaurant_name ||
            bot.clinic_name ||
            bot.gym_name
          })`,
        },
      ]);

      alert("Deleted successfully ✅");
      getUserData();
    }
  };

  const getTimeLeft = (createdAt) => {
    const endTime = new Date(createdAt);
    endTime.setDate(endTime.getDate() + 30);

    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) return "Expired ❌";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days} days : ${hours} hours : ${minutes} min`;
  };

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/Land2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <Navbar />
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[320px] bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 text-left">
  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
  Bot Edit Requests
</h3>

  <p className="text-white/80 leading-relaxed">
    If you wish to request changes or updates to your bot, please contact our support team via email.
    Kindly include the <strong>name of your bot</strong> and a clear description of the changes you would like to apply.
  </p>

  <p className="text-blue-300 mt-4 font-medium">
    📧 Email: botbuddy09@gmail.com
  </p>
</div>

      <div className="relative z-10 px-10 pt-32 pb-20 text-center">
        <h1 className="text-5xl font-bold mb-6">User Information</h1>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto text-left">
          <h2 className="text-2xl font-bold mb-4">Your Bots</h2>
          

          {bots.length > 0 ? (
            bots.map((bot) => (
              <div key={bot.id} className="mb-6">

                {/* RESTAURANT BOT */}
                {bot.restaurant_name && (
                  <>
                    <p className="text-white/80 mb-2">
                      <strong>Restaurant Name:</strong>{" "}
                      {bot.restaurant_name}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Location:</strong> {bot.location}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Open Days:</strong> {bot.open_days}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Open Time:</strong> {bot.open_time}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Close Time:</strong> {bot.close_time}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Info:</strong> {bot.info_restaurant}
                    </p>

                    {bot.menu && (
                      <div className="mt-4">
                        <p className="text-white/80 mb-2">
                          <strong>Menu:</strong>
                        </p>

                        <div className="bg-white/10 p-4 rounded-xl whitespace-pre-wrap">
                          {bot.menu}
                        </div>
                      </div>
                    )}

                    <p className="text-green-400 font-bold mt-3">
                      Subscription Left:{" "}
                      {getTimeLeft(bot.created_at)}
                    </p>
                  </>
                )}

                {/* CLINIC BOT */}
                {bot.clinic_name && (
                  <>
                    <p className="text-white/80 mb-2">
                      <strong>Clinic Name:</strong>{" "}
                      {bot.clinic_name}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Specialty:</strong>{" "}
                      {bot.clinic_specialty}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Location:</strong>{" "}
                      {bot.clinic_location}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Days:</strong> {bot.clinic_days}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Open:</strong>{" "}
                      {bot.clinic_open_time}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Close:</strong>{" "}
                      {bot.clinic_close_time}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Info:</strong> {bot.clinic_info}
                    </p>

                    <p className="text-green-400 font-bold mt-3">
                      Subscription Left:{" "}
                      {getTimeLeft(bot.created_at)}
                    </p>
                  </>
                )}

                {/* GYM BOT */}
                {bot.gym_name && (
                  <>
                    <p className="text-white/80 mb-2">
                      <strong>Gym Name:</strong> {bot.gym_name}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Location:</strong>{" "}
                      {bot.gym_location}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Days:</strong> {bot.gym_days}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Open:</strong>{" "}
                      {bot.gym_open_time}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Close:</strong>{" "}
                      {bot.gym_close_time}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Bundles:</strong>{" "}
                      {bot.gym_bundles}
                    </p>

                    <p className="text-white/80 mb-2">
                      <strong>Info:</strong> {bot.gym_info}
                    </p>

                    <p className="text-green-400 font-bold mt-3">
                      Subscription Left:{" "}
                      {getTimeLeft(bot.created_at)}
                    </p>
                  </>
                )}

                <button
                  onClick={() => handleDelete(bot)}
                  className="mt-4 bg-red-500 px-5 py-2 rounded-full hover:bg-red-600 transition"
                >
                  Delete Bot 🗑️
                </button>

                <hr className="my-6 border-white/20" />
              </div>
            ))
          ) : (
            <p className="text-white/70">
              No bots purchased yet.
            </p>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 px-8 py-3 rounded-full hover:scale-105 transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}