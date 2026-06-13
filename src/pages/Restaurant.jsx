import { useState, useEffect } from "react";
import FormLayout from "../components/FormLayout";
import { supabase } from "../lib/supabase";

export default function Restaurant() {
  const [showPayment, setShowPayment] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState("");
  const [menu, setMenu] = useState("");

  const [days, setDays] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const isRestaurantFormValid = () => {
    return (
      name.trim() &&
      location.trim() &&
      days.trim() &&
      openTime.trim() &&
      closeTime.trim() &&
      info.trim() &&
      menu.trim()
    );
  };

  const fetchRestaurants = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (!error) {
      setRestaurants(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handlePayment = async () => {
    if (!isRestaurantFormValid()) {
      alert("Please fill all fields ❌");
      return;
    }

    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData?.user) {
      alert("User not logged in ❌");
      return;
    }

    const userEmail = userData.user.email;

    const { error } = await supabase.from("users").insert([
      {
        restaurant_name: name,
        location: location,
        open_days: days,
        open_time: openTime ? openTime + ":00" : null,
        close_time: closeTime ? closeTime + ":00" : null,
        info_restaurant: info,
        menu: menu,
        email: userEmail,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error ❌");
    } else {
      await supabase.from("notifications").insert([
        {
          message: `🟢 New bot purchased by ${userEmail} (${name})`,
        },
      ]);

      setShowPayment(false);

      setSuccessMessage(
        "Purchase successful! We will email you shortly. Please send your Telegram details and email/calendar info to complete setup."
      );

      setName("");
      setLocation("");
      setInfo("");
      setMenu("");
      setDays("");
      setOpenTime("");
      setCloseTime("");

      fetchRestaurants();
    }
  };

  return (
    <div className="relative">
      <FormLayout title="Restaurant Setup">
        <input
          placeholder="Restaurant Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Location"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Open Days"
          className="input"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <input
          placeholder="Open Time (HH:MM)"
          className="input"
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
        />

        <input
          placeholder="Close Time (HH:MM)"
          className="input"
          value={closeTime}
          onChange={(e) => setCloseTime(e.target.value)}
        />

        <input
          placeholder="More Info About Your Restaurant"
          className="input"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <textarea
          placeholder="Type your full menu here..."
          className="input min-h-[200px]"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        />
      </FormLayout>

      <div className="absolute right-[320px] top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => {
            if (!isRestaurantFormValid()) {
              alert("Please fill all fields ❌");
              return;
            }
            setShowPayment(true);
          }}
          disabled={!isRestaurantFormValid()}
          className={`px-6 py-3 rounded-full shadow-lg transition ${
            isRestaurantFormValid()
              ? "bg-blue-500 hover:scale-105 text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
          }`}
        >
          Purchase →
        </button>
      </div>

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

            <input
              placeholder="Card Number"
              className="w-full mb-4 p-3 rounded border"
            />

            <div className="flex gap-4">
              <input
                placeholder="MM/YY"
                className="w-1/2 p-3 rounded border"
              />
              <input
                placeholder="CVC"
                className="w-1/2 p-3 rounded border"
              />
            </div>

            <input
              placeholder="Card Holder Name"
              className="w-full mt-4 p-3 rounded border"
            />

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-full hover:scale-105 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
          <div className="bg-white text-black p-6 rounded-2xl w-[380px] text-center shadow-2xl">
            <h2 className="text-xl font-bold mb-3">Success ✅</h2>

            <p className="text-sm leading-relaxed">
              {successMessage}
            </p>

            <button
              onClick={() => setSuccessMessage("")}
              className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-full hover:scale-105 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}