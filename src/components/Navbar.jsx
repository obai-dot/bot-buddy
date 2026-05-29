import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ONLY ADD

  useEffect(() => {

    const getUser = async () => {
      setLoading(true); // ✅ ONLY ADD

      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const name =
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "User";

        setUserName(name);
      } else {
        setUserName(null);
      }

      setLoading(false); // ✅ ONLY ADD
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const name =
            session.user.user_metadata?.full_name ||
            session.user.email?.split("@")[0] ||
            "User";

          setUserName(name);
        } else {
          setUserName(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  const appPages = [
    "/dashboard",
    "/chatbot",
    "/restaurant",
    "/clinic",
    "/gym",
    "/userinfo",
  ];

  const isDirectAppPage = appPages.includes(location.pathname);

  useEffect(() => {
    if (!isDirectAppPage) {
      localStorage.removeItem("fromPage");
    }
  }, [location.pathname]);

  const fromPage = localStorage.getItem("fromPage");

  const isFromApp =
    (location.pathname === "/about" ||
      location.pathname === "/features" ||
      location.pathname === "/contact") &&
    appPages.includes(fromPage);

  const isApp = isDirectAppPage || isFromApp;

  const handleLoginClick = () => {
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("startTransition"));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-4 text-white bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">

      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex items-center gap-2"
      >
        <img
          src="/logo.png"
          className="h-16 hover:scale-110 transition duration-300"
        />
      </div>

      <div className="flex items-center gap-8 text-white/80">

        <span
          onClick={() => {
            if (appPages.includes(location.pathname)) {
              localStorage.setItem("fromPage", location.pathname);
            }
            navigate("/features");
          }}
          className="hover:text-white cursor-pointer"
        >
          Features
        </span>

        <span
          onClick={() => {
            if (appPages.includes(location.pathname)) {
              localStorage.setItem("fromPage", location.pathname);
            }
            navigate("/about");
          }}
          className="hover:text-white cursor-pointer"
        >
          About
        </span>

        <span
          onClick={() => {
            if (appPages.includes(location.pathname)) {
              localStorage.setItem("fromPage", location.pathname);
            }
            navigate("/contact");
          }}
          className="hover:text-white cursor-pointer"
        >
          Contact
        </span>

      </div>

      {/* ✅ ONLY FIXED PART */}
      {loading ? (
        <div className="w-24 h-8 bg-white/10 rounded-full animate-pulse"></div>
      ) : userName ? (
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md cursor-pointer hover:bg-white/20 transition"
          >
            👤 {userName}
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg overflow-hidden">

              <div
                onClick={() => {
                  setOpen(false);
                  navigate("/userinfo");
                }}
                className="px-4 py-3 hover:bg-white/20 cursor-pointer"
              >
                User Info
              </div>

              <div
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUserName(null);
                  navigate("/login");
                }}
                className="px-4 py-3 hover:bg-red-500/40 cursor-pointer text-red-300"
              >
                Logout
              </div>

            </div>
          )}

        </div>
      ) : (
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-blue-600 transition"
        >
          Log In
        </button>
      )}
    </div>
  );
}