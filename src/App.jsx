import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatBot from "./pages/ChatBot";
import About from "./pages/About";
import Restaurant from "./pages/Restaurant";
import Clinic from "./pages/Clinic";
import Gym from "./pages/Gym";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import UserInfo from "./pages/UserInfo";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/about" element={<About />} />
      <Route path="/restaurant" element={<Restaurant />} />
<Route path="/clinic" element={<Clinic />} />
<Route path="/gym" element={<Gym />} />
<Route path="/features" element={<Features />} />
<Route path="/contact" element={<Contact />} />
<Route path="/userinfo" element={<UserInfo />} />


<Route
  path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute> }/>
    </Routes>
  );
}

export default App;