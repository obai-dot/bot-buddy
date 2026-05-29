import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// ✅ ADDED
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export default function ChatBot() {
  const navigate = useNavigate();

  // ✅ GET BACKGROUND STATE
  const bgState = localStorage.getItem("bg") || "default";

  // ✅ ADDED TEST FUNCTION
  const testInsert = async () => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          message: "Hello",
          response: "Hi!",
          email: "test@test.com"
        }
      ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);
  };

 
  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* ✅ DYNAMIC BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${
            bgState === "final" ? "/Land2.jpg" : "/hero.jpg"
          }')`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      <Navbar />

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-24 px-6">

        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Meet your new AI teammate.
        </h1>

        <p className="text-white/80 mb-10">
          That’s your customizable voice bot ready to be customized.
        </p>

        {/* INDUSTRY */}
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Choose Your Industry:
        </h2>

        <div className="flex flex-col gap-6 items-center">

          {/* RESTAURANTS */}
          <button
            onClick={() => navigate("/restaurant")}
            className="bg-white/20 backdrop-blur-xl px-10 py-4 rounded-full border border-white/30 hover:scale-105 hover:bg-white/30 transition"
          >
            Restaurants Industry
          </button>

          {/* CLINICS */}
          <button
            onClick={() => navigate("/clinic")}
            className="bg-white/20 backdrop-blur-xl px-10 py-4 rounded-full border border-white/30 hover:scale-105 hover:bg-white/30 transition"
          >
            Clinics Industry
          </button>

          {/* GYMS */}
          <button
            onClick={() => navigate("/gym")}
            className="bg-white/20 backdrop-blur-xl px-10 py-4 rounded-full border border-white/30 hover:scale-105 hover:bg-white/30 transition"
          >
            Gyms Industry
          </button>

        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-12 bg-white/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/30 hover:scale-105 hover:bg-white/30 transition"
        >
          ← Back
        </button>

      </div>

      {/* PRICE BOX */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-[180px] text-center shadow-2xl">
        
        <h3 className="text-white text-xl mb-4">
          Price Detector
        </h3>

        <div className="border border-white/30 rounded-xl h-[200px] flex items-end justify-center mb-4">
          <span className="text-2xl text-white mb-4">15 $</span>
        </div>

        <div className="bg-blue-500 h-16 rounded-xl"></div>
      </div>

    </div>
  );
}