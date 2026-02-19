import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu"; 
import About from "./pages/About";
import WhyChooseUs from "./pages/WhyChooseUs";
import AdminLogin from "./pages/AdminLogin";
import ManageItems from "./pages/ManageItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
         <Route path="/whychooseus" element={<WhyChooseUs/>} />
          <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/manageitems" element={<ManageItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
