import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ GET BACKGROUND STATE
  const bgState = localStorage.getItem("bg") || "default";

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

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-32 px-6">
        
        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome to your BotBuddy Workspace
        </h1>

        <p className="text-white/80 mb-12">
          Choose a character and your preferred choices to bring your AI to life.
        </p>

        {/* CARDS */}
        <div className="flex gap-10 flex-wrap justify-center">
          
          {/* CHAT BOT */}
          <div
            onClick={() => navigate("/chatbot")}
            className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 w-[360px] shadow-2xl hover:scale-105 hover:shadow-blue-500/30 transition duration-300 cursor-pointer"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Chat Bot
            </h2>

            <p className="text-white/90 mb-4 leading-relaxed">
              Create a text-based AI assistant that chats with users, answers
              questions, and automates workflows across your tools.
            </p>

            <p className="text-white/90 mb-4 leading-relaxed">
              Perfect for websites, support, internal teams, and messaging platforms.
            </p>

            <p className="text-white/70 mt-4">
              Best for text conversations and written workflows
            </p>
          </div>

          {/* VOICE BOT */}
          <div
            className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 w-[360px] shadow-2xl hover:scale-105 hover:shadow-cyan-500/30 transition duration-300 cursor-pointer"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Voice Bot
            </h2>

            <p className="text-white/90 mb-4 leading-relaxed">
              Build a voice-enabled AI that speaks, listens, and handles real-time conversations.
            </p>

            <p className="text-white/90 mb-4 leading-relaxed">
              Ideal for calls, IVR systems, voice assistants, and hands-free automation.
            </p>

            <p className="text-white/70 mt-4">
              Best for phone calls and voice interactions
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}