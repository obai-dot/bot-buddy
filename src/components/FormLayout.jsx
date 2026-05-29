import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function FormLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <Navbar />

      {/* LEFT IMAGE */}
      <img
        src="/kj.png"
        className="absolute left-16 bottom-0 h-[90%] object-contain opacity-95 pointer-events-none"
      />

      {/* BACK BUTTON 🔥 */}
      <button
        onClick={() => navigate("/chatbot")}
className="absolute top-24 left-10 z-20 
bg-white/10 backdrop-blur-xl 
px-6 py-2 rounded-full 
border border-white/20 
hover:bg-white/20 hover:scale-105 
transition shadow-lg"      >
        ← Back
      </button>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center pt-24">

        <h1 className="text-5xl font-bold text-center mb-2">
          Meet your new AI teammate.
        </h1>

        <p className="text-white/80 mb-10">
          That’s your customizable voice bot ready to be customized.
        </p>

        {/* FORM CARD */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
rounded-3xl p-10 w-[420px] space-y-5 
shadow-[0_0_40px_rgba(0,255,255,0.15)]">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">
            {title}
          </h2>

          {children}

        </div>
      </div>

      {/* PRICE CARD */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-cyan-300/40 rounded-3xl p-6 w-[180px] text-center shadow-2xl">

        <h3 className="text-cyan-300 text-xl mb-4">
          Price Detector
        </h3>

        <div className="border border-cyan-300/40 rounded-xl h-[220px] flex items-end justify-center mb-4">
          <span className="text-2xl text-cyan-300 mb-4">25 $</span>
        </div>

        <div className="bg-cyan-400 h-20 rounded-xl"></div>
      </div>

    </div>
  );
}