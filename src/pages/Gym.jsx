import { useState } from "react";
import FormLayout from "../components/FormLayout";
import { supabase } from "../lib/supabase";

export default function Gym() {
  const [showPayment, setShowPayment] = useState(false);

  // 🔥 STATE
  const [gymName, setGymName] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [bundles, setBundles] = useState("");
  const [info, setInfo] = useState("");

  // ✅ VALIDATION (GYM ONLY)
  const isGymFormValid = () => {
    return (
      gymName.trim() &&
      location.trim() &&
      days.trim() &&
      openTime.trim() &&
      closeTime.trim() &&
      bundles.trim() &&
      info.trim()
    );
  };

  // 🔥 SAVE TO DB
  const handlePurchase = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in");
      return;
    }

    const { error } = await supabase.from("users").insert([
      {
        email: user.email,
        gym_name: gymName,
        gym_location: location,
        gym_days: days,
        gym_open_time: openTime,
        gym_close_time: closeTime,
        gym_bundles: bundles,
        gym_info: info,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error saving ❌");
    } else {
      alert("Gym bot created ✅");
      setShowPayment(false);
    }
  };

  return (
    <div className="relative">

      <FormLayout title="Gym Setup">

        <input placeholder="Gym Name" className="input" onChange={(e) => setGymName(e.target.value)} />
        <input placeholder="Gym Location" className="input" onChange={(e) => setLocation(e.target.value)} />
        <input placeholder="Open Days" className="input" onChange={(e) => setDays(e.target.value)} />
        <input placeholder="Open Time" className="input" onChange={(e) => setOpenTime(e.target.value)} />
        <input placeholder="Close Time" className="input" onChange={(e) => setCloseTime(e.target.value)} />

        <textarea
          placeholder="Bundles (1 Month - $30, 3 Months - $75)"
          className="input h-24 resize-none"
          onChange={(e) => setBundles(e.target.value)}
        />

        <input
          placeholder="More Info About Your Gym"
          className="input"
          onChange={(e) => setInfo(e.target.value)}
        />

      </FormLayout>

      {/* PURCHASE BUTTON */}
      <div className="absolute right-[320px] top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => {
            if (!isGymFormValid()) {
              alert("Please fill in all gym fields before continuing ❌");
              return;
            }
            setShowPayment(true);
          }}
          disabled={!isGymFormValid()}
          className={`px-6 py-3 rounded-full shadow-lg transition ${
            isGymFormValid()
              ? "bg-blue-500 hover:scale-105 text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
          }`}
        >
          Purchase →
        </button>
      </div>

      {/* PAYMENT POPUP */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">

          <div className="bg-white text-black rounded-2xl p-8 w-[400px] shadow-2xl relative">

            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Payment Details
            </h2>

            <input placeholder="Card Number" className="w-full mb-4 p-3 rounded border" />

            <div className="flex gap-4">
              <input placeholder="MM/YY" className="w-1/2 p-3 rounded border" />
              <input placeholder="CVC" className="w-1/2 p-3 rounded border" />
            </div>

            <input placeholder="Card Holder Name" className="w-full mt-4 p-3 rounded border" />

            <button
              onClick={handlePurchase}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-full hover:scale-105 transition"
            >
              Pay Now
            </button>

          </div>
        </div>
      )}
    </div>
  );
}