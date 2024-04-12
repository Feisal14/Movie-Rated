import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Auth from "./pages/auth/auth";

import "./App.css";
import Home from "./pages/home/home";
import Tvshow from "./pages/tvshow/tvshow";
import Movie from "./pages/movie/movie";
import Rated from "./pages/rated";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rated" element={<Rated/> }/>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<Tvshow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
