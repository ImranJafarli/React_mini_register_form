import React, { useState } from "react";

// axios
import axios from "axios";

// component
import Button from "../components/Button";
import Input from "../components/Input";

// alert
import Swal from "sweetalert2";

// library
import { useNavigate, Link } from "react-router-dom";

// icon
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const [view, setView] = useState("password");

  const toggleView = () => {
    view === "password" ? setView("text") : setView("password");
  };

  const Icon = view === "password" ? BiShow : BiHide;

  const onHandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    axios.get(`http://localhost:9000/login`, user).then((res) => {
      if (
        res.data.some(
          (item) => item.email === email && item.password === password
        )
      ) {
        Swal.fire("Təbriklər", "Giriş uğurlu oldu", "success");
        setTimeout(() => {
          navigate("/posts");
        }, 3000);
      } else {
        Swal.fire(
          "Belə hesab tapılmadı",
          "Qeydiyyat səhifəsinə yönəldilirsiniz",
          "warning"
        );
        setUser({ email: "", password: "" });
        setTimeout(() => {
          navigate("/register");
        }, 2500);
      }
    });
  };

  return (
    <div className="form">
      <h1>Giriş</h1>
      <Input
        type="email"
        placeholder="Enter you email"
        name="email"
        required
        value={email}
        onChange={onHandleChange}
      />
      <Input
        type={view}
        placeholder="Enter you password"
        name="password"
        value={password}
        onChange={onHandleChange}
      />
      <span onClick={toggleView}>
        <Icon style={{ fontSize: 26 }} />
      </span>
      <Button
        className={
          "register" + (email === "" || password === "" ? "disabled" : "")
        }
        title="Login"
        onClick={handleLogin}
        disabled={email === "" || password === ""}
      />
      <Link to="/register" style={{ marginTop: 45, fontSize: 26 }}>
        Qeydiyyat
      </Link>
    </div>
  );
};

export default Login;
