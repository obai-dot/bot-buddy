import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const navigate = useNavigate();

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

  // ✅ NEW STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // ✅ SEND MESSAGE
  const handleSend = async () => {
    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          full_name: name,
          email,
          subject,
          message,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Failed to send ❌");
    } else {
      alert("Message sent ✅");

      // clear form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/Land2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <Navbar />

      <div className="relative z-10 px-10 pt-32 pb-20">

        <h1 className="text-5xl font-bold text-center mb-4">
          Contact BotBuddy
        </h1>

        <p className="text-center text-white/80 mb-12">
          We're here to help you automate smarter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

            <p className="text-white/80 mb-6">
              Have questions about BotBuddy, need support, or want to explore automation for your team?
              We're here to help you design smarter workflows and reduce manual work.
            </p>

            <div className="mb-6">
              <h3 className="font-semibold">Email</h3>
              <p className="text-white/70">botbuddy09@gmail.com</p>
            </div>

            <div>
              <h3 className="font-semibold">Business Hours</h3>
              <p className="text-white/70">
                Sunday – Thursday<br />
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mb-6 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-6 bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={handleSend}
              className="bg-blue-500 px-8 py-3 rounded-full hover:scale-105 transition"
            >
              Send Message
            </button>

            <p className="text-white/50 text-sm mt-4">
              Your information is used only to respond to your request.
            </p>
          </div>

        </div>

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