// library
import { Route, Routes, useLocation } from "react-router-dom";
// component
import Footer from "./components/Footer";
import Header from "./components/Header";
// pages
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Post from "./pages/Post";

// style
import "../src/assets/main.scss";

function App() {
  let location = useLocation();
  const showHeader = location.pathname === "/posts";

  return (
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
