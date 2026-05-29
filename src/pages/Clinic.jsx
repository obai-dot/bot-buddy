import { useState } from "react";
import FormLayout from "../components/FormLayout";
import { supabase } from "../lib/supabase";

export default function Clinic() {
  const [showPayment, setShowPayment] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [info, setInfo] = useState("");

  // ✅ VALIDATION
  const isClinicFormValid = () => {
    return (
      name.trim() &&
      location.trim() &&
      days.trim() &&
      openTime.trim() &&
      closeTime.trim() &&
      specialty.trim() &&
      info.trim()
    );
  };

  // ✅ PAYMENT + SAVE
  const handlePayment = async () => {
    if (!isClinicFormValid()) {
      alert("Please fill all clinic fields ❌");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      alert("User not logged in ❌");
      return;
    }

    const userEmail = userData.user.email;

    const { error } = await supabase.from("users").insert([
      {
        clinic_name: name,
        clinic_location: location,
        clinic_days: days,
        clinic_open_time: openTime ? openTime + ":00" : null,
        clinic_close_time: closeTime ? closeTime + ":00" : null,
        clinic_specialty: specialty,
        clinic_info: info,
        email: userEmail,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error ❌");
    } else {
      alert("Saved & Paid ✅");
      setShowPayment(false);
    }
  };

  return (
    <div className="relative">

      <FormLayout title="Clinic Setup">

        <input placeholder="Clinic Name" className="input" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Clinic Location" className="input" onChange={(e) => setLocation(e.target.value)} />
        <input placeholder="Open Days" className="input" onChange={(e) => setDays(e.target.value)} />
        <input placeholder="Open Time" className="input" onChange={(e) => setOpenTime(e.target.value)} />
        <input placeholder="Close Time" className="input" onChange={(e) => setCloseTime(e.target.value)} />

        <input
          placeholder="Clinic Specialty (Dental, Skin, etc)"
          className="input"
          onChange={(e) => setSpecialty(e.target.value)}
        />

        <input
          placeholder="More Info About Your Clinic"
          className="input"
          onChange={(e) => setInfo(e.target.value)}
        />

      </FormLayout>

      {/* PURCHASE BUTTON */}
      <div className="absolute right-[320px] top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => {
            if (!isClinicFormValid()) {
              alert("Please fill all clinic fields ❌");
              return;
            }
            setShowPayment(true);
          }}
          disabled={!isClinicFormValid()}
          className={`px-6 py-3 rounded-full shadow-lg transition ${
            isClinicFormValid()
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
              onClick={handlePayment}
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