import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  // ✅ WHERE USER CAME FROM
  const fromPage = localStorage.getItem("fromPage");

const handleBack = () => {
  if (fromPage === "/login" || fromPage === "/signup") {
    navigate("/login");
  } else if (
    fromPage === "/dashboard" ||
    fromPage === "/chatbot" ||
    fromPage === "/gym" ||
    fromPage === "/userinfo" ||
    fromPage === "/restaurant" ||
    fromPage === "/clinic"
  ) {
    navigate("/dashboard");
  } else {
    const isLoggedIn = !!localStorage.getItem("user");
    navigate(isLoggedIn ? "/dashboard" : "/login");
  }

  // 🔥 IMPORTANT: clear it after using
  localStorage.removeItem("fromPage");
};

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/Land2.jpg')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      <Navbar />

      {/* CONTENT */}
      <div className="relative z-10 px-10 pt-32 pb-20">

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-center mb-4">
          About BotBuddy
        </h1>

        <p className="text-center text-white/80 mb-10">
          Empowering teams with intelligent automation
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* MISSION */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-white/80">
              At BotBuddy, we believe automation should be simple, human, and accessible.
              Our mission is to remove complexity from daily operations and help teams
              focus on what truly matters.
            </p>
          </div>

          {/* VISION */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-white/80">
              We envision a future where every professional has access to an
              intelligent assistant that works quietly in the background.
            </p>
          </div>

          {/* DIFFERENT */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-3">
              What Makes BotBuddy Different?
            </h2>
            <ul className="text-white/80 list-disc pl-5 space-y-2">
              <li>No coding required</li>
              <li>Context-aware AI agents</li>
              <li>Faster setup</li>
              <li>Seamless integrations</li>
            </ul>
          </div>

          {/* WHO FOR */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-3">
              Who BotBuddy Is For?
            </h2>
            <p className="text-white/80 mb-2">
              Built for teams that want to move faster without complexity.
            </p>

            <ul className="text-white/80 list-disc pl-5 space-y-1">
              <li>Support Teams</li>
              <li>Marketing Teams</li>
              <li>Product Teams</li>
              <li>Startups & Enterprises</li>
            </ul>
          </div>

        </div>

        {/* BACK BUTTON */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleBack}
            className="bg-blue-500 px-8 py-3 rounded-full hover:scale-105 transition"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
}