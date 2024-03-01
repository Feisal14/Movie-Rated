import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Auth from "./pages/auth/auth";

import "./App.css";
import Home from "./pages/home/home";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/rated" element={<h1>rated</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
