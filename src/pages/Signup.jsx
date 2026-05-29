import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const navigate = useNavigate();
  const [playVideo, setPlayVideo] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // ❌ REMOVED FAKE LOGOUT (THIS WAS BREAKING EVERYTHING)

  const handleTransition = () => {
    setPlayVideo(true);
    localStorage.setItem("bg", "final");
  };

  // ✅ FIXED SIGNUP
  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created ✅");

      // ✅ MAKE STATE CONSISTENT
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("isAdmin");

      handleTransition();
    }
  };

  useEffect(() => {
    const trigger = () => {
      handleTransition();
    };

    window.addEventListener("startTransition", trigger);

    return () => {
      window.removeEventListener("startTransition", trigger);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {playVideo && (
        <video
          src="/transition.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
          onEnded={() => navigate("/login")}
        />
      )}

      <div className="absolute inset-0 bg-black/60 z-20"></div>

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-30 px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Clear the office. <br /> Keep your KPIs.
        </h1>

        <p className="text-white/80 mb-6">
          Automation that works quietly in the background.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleTransition}
            className="bg-blue-500 px-6 py-3 rounded-full hover:scale-105 transition"
          >
            Get Started →
          </button>

          <button className="text-blue-300 hover:underline">
            Learn More →
          </button>
        </div>
      </div>

      <div className="absolute right-20 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[350px] text-white shadow-2xl">

          <h2 className="text-2xl font-bold mb-2">Hey There!</h2>
          <p className="text-white/70 mb-6">Create your account</p>

          <input
            className="w-full mb-3 p-3 rounded bg-white/10 border border-white/20"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="w-full mb-3 p-3 rounded bg-white/10 border border-white/20"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full mb-3 p-3 rounded bg-white/10 border border-white/20"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="w-full mb-6 p-3 rounded bg-white/10 border border-white/20"
            placeholder="Confirm Password"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-blue-500 py-3 rounded-full"
          >
            Create account
          </button>

          <p className="text-sm text-center mt-4 text-white/70">
            Already have an account?{" "}
            <span
              onClick={handleTransition}
              className="text-blue-400 cursor-pointer"
            >
              Log in
            </span>
          </p>

          <button className="w-full bg-white text-black py-3 rounded-full flex items-center justify-center gap-2 mt-4">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
            Sign up with Google
          </button>

        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center gap-6 px-6 z-40">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white w-[250px] text-center shadow-xl">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold">Start in Minutes</h3>
          <p className="text-sm text-white/70">No heavy setup.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white w-[250px] text-center shadow-xl">
          <div className="text-2xl mb-2">🛡️</div>
          <h3 className="font-semibold">Human-like AI</h3>
          <p className="text-sm text-white/70">Understands context.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white w-[250px] text-center shadow-xl">
          <div className="text-2xl mb-2">🌐</div>
          <h3 className="font-semibold">Simple to Launch</h3>
          <p className="text-sm text-white/70">Deploy fast.</p>
        </div>

      </div>

    </div>
  );
}