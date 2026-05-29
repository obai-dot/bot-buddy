import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <img
        src="/hero.jpg"
        className="absolute w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CENTER TEXT 🔥 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Clear the office. Keep your KPIs.
        </h1>

        <p className="text-lg opacity-80 mb-6">
          Automation that works quietly in the background.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 px-6 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Get Started →
          </button>

          <button className="text-blue-300">
            Learn More →
          </button>
        </div>
      </div>

      {/* BOTTOM CARDS 🔥 */}
      <div className="absolute bottom-10 w-full flex justify-center gap-6 px-6">

        {/* Card 1 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-white w-[250px] text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold mb-1">Start in Minutes</h3>
          <p className="text-sm opacity-70">
            No heavy setup. No learning curve.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-white w-[250px] text-center">
          <div className="text-2xl mb-2">🛡️</div>
          <h3 className="font-semibold mb-1">Human-Like AI Agents</h3>
          <p className="text-sm opacity-70">
            Smart agents that understand context.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-white w-[250px] text-center">
          <div className="text-2xl mb-2">🌐</div>
          <h3 className="font-semibold mb-1">Simple to Launch</h3>
          <p className="text-sm opacity-70">
            Build and deploy easily.
          </p>
        </div>

      </div>

    </div>
  );
}