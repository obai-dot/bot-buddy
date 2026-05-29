import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  // ✅ SAME LOGIC AS ABOUT
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
      <div className="relative z-10 px-10 pt-32 pb-20 text-center">

        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-4">
          Powerful Integrations
        </h1>

        <p className="text-white/80 mb-12">
          Connect all your favorite tools and services in one unified automation platform
        </p>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {[
            {
              title: "Google Sheets",
              desc: "Automatically sync data, create reports, and update spreadsheets in real-time.",
              color: "bg-green-500"
            },
            {
              title: "Google Calendar",
              desc: "Schedule meetings, create events, and manage your calendar effortlessly.",
              color: "bg-blue-500"
            },
            {
              title: "Gmail",
              desc: "Send emails, organize inbox, and automate responses intelligently.",
              color: "bg-red-500"
            },
            {
              title: "Connect Your Website",
              desc: "Connect to any website API, scrape data, and automate web interactions.",
              color: "bg-purple-500"
            },
            {
              title: "Instant Webhooks",
              desc: "Trigger workflows instantly with custom webhooks and real-time events.",
              color: "bg-yellow-500"
            },
            {
              title: "Data Storage",
              desc: "Store and retrieve data seamlessly across all your automated workflows.",
              color: "bg-cyan-500"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-left hover:scale-105 transition"
            >
              <div className={`w-12 h-12 rounded-xl mb-4 ${item.color}`}></div>
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}

        </div>

        {/* HOW IT WORKS */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>

          <p className="text-white/70 mb-10">
            Unlike traditional automation tools, BotBuddy understands intent — not just triggers.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-12">

            {[
              "Choose Your Wanted Features",
              "Build Your Flow",
              "Activate & Relax"
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {`0${i + 1}`}
                </div>
                <p className="text-white/80">{step}</p>
              </div>
            ))}

          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="flex justify-center mt-16">
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