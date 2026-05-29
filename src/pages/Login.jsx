import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react"; // ✅ ADDED useEffect
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const bgState = localStorage.getItem("bg");

  const ADMIN_EMAIL = "botbuddy09@gmail.com";

  // ✅ 🔥 NEW FIX (prevents logged-in users staying on login page)
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        if (data.user.email === ADMIN_EMAIL) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    };

    checkUser();
  }, []);

  // ✅ LOGIN FUNCTION (unchanged)
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      localStorage.setItem("isLoggedIn", "true");

      if (data.user.email === ADMIN_EMAIL) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        localStorage.removeItem("isAdmin");
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${
            bgState === "final" ? "/Land2.jpg" : "/hero.jpg"
          }')`,
        }}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Clear the office. <br /> Keep your KPIs.
        </h1>

        <p className="text-white/80 mb-6">
          Automation that works quietly in the background.
        </p>
      </div>

      <div className="absolute right-20 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[350px] text-white shadow-2xl">

          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-white/70 mb-6">Happy to serve you again</p>

          <input
            className="w-full mb-4 p-3 rounded bg-white/10 border border-white/20 outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full mb-6 p-3 rounded bg-white/10 border border-white/20 outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Log In
          </button>

          <p className="text-sm text-center mt-4 text-white/70">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-400 cursor-pointer"
            >
              Sign up
            </span>
          </p>

          <button className="w-full bg-white text-black py-3 rounded-full flex items-center justify-center gap-2 mt-4 shadow-md">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Continue with Google
          </button>

        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center gap-6 px-6 z-10">

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