import React from "react";
// library
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Xoş Gəlmisiniz</h1>
      <div>
        <ul>
          <li>
            Hesabınız var mı? <Link to="/login">Giriş</Link>
          </li>
          <li>
            Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
