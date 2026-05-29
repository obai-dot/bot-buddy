export default function Auth() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex items-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ===== MIDDLE TEXT ===== */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="max-w-2xl text-white text-center md:text-left ml-10 md:ml-24">

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Clear the office.<br />Keep your KPIs.
          </h1>

          <p className="text-lg md:text-xl opacity-80 mb-6">
            Automation that works quietly in the background.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full transition">
              Get Started →
            </button>

            <button className="text-blue-400 hover:underline">
              Learn More →
            </button>
          </div>

        </div>
      </div>

      {/* ===== RIGHT PANEL (FIXED DESIGN) ===== */}
      <div className="relative z-10 ml-auto mr-10 w-[400px] h-[90%] rounded-3xl 
      bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-2xl 
      border border-white/20 shadow-2xl p-8 flex flex-col justify-center text-white">

        <h2 className="text-3xl font-bold mb-2">Hey There!</h2>
        <p className="mb-6 opacity-80">Create your account</p>

        <div className="flex flex-col gap-4">

          <input type="text" placeholder="Write Your Full Name"
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/60" />

          <input type="email" placeholder="Write Your Email Address"
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/60" />

          <input type="password" placeholder="Write Your Own Password"
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/60" />

          <input type="password" placeholder="Confirm Your Password"
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/60" />

        </div>

        <button className="mt-6 bg-blue-500 hover:bg-blue-600 py-3 rounded-full">
          Create account
        </button>

        <p className="text-sm text-center mt-4 opacity-80">
          Already have an account? <span className="text-blue-400">Log in</span>
        </p>

        <div className="flex items-center gap-2 my-4 opacity-60">
          <div className="flex-1 h-px bg-white/30"></div>
          <span>or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        <button className="bg-white text-black py-3 rounded-full flex items-center justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

      </div>

      {/* ===== BOTTOM CARDS ===== */}
      <div className="absolute bottom-10 w-full flex justify-center z-10 px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 w-[350px] text-white shadow-lg">
            <div className="mb-4 text-blue-400 text-2xl">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Start in Minutes</h3>
            <p className="text-sm opacity-80">
              No heavy setup. No learning curve.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
            <div className="mb-4 text-blue-400 text-2xl">🛡</div>
            <h3 className="font-semibold text-lg mb-2">Human-Like AI Agents</h3>
            <p className="text-sm opacity-80">
              Smart agents that understand context, timing, and real workflows.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
            <div className="mb-4 text-blue-400 text-2xl">🌐</div>
            <h3 className="font-semibold text-lg mb-2">Simple to Launch</h3>
            <p className="text-sm opacity-80">
              Build and deploy automations without complex rules or setup.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}