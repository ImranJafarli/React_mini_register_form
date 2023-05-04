import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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

const Register = () => {
  const countries = [
    { code: "AZ", label: "Azerbaijan", phone: "994" },
    { code: "BB", label: "Barbados", phone: "1-246" },
    { code: "GA", label: "Gabon", phone: "241" },
    { code: "ID", label: "Indonesia", phone: "62" },
    { code: "IE", label: "Ireland", phone: "353" },
    { code: "IQ", label: "Iraq", phone: "964" },
    {
      code: "IR",
      label: "Iran, Islamic Republic of",
      phone: "98",
    },
    { code: "ME", label: "Montenegro", phone: "382" },
    { code: "NL", label: "Netherlands", phone: "31" },
    { code: "TR", label: "Turkey", phone: "90" },
    { code: "ZM", label: "Zambia", phone: "260" },
    { code: "ZW", label: "Zimbabwe", phone: "263" },
  ];

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    passwordMatch: true,
  });

  const {
    email,
    password,
    name,
    phone,
    username,
    confirmPassword,
    passwordMatch,
  } = user;

  const [view, setView] = useState("password");

  const toggleView = () => {
    view === "password" ? setView("text") : setView("password");
  };

  const Icon = view === "password" ? BiShow : BiHide;

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setUser({
        ...user,
        password: value,
        passwordMatch: value === confirmPassword,
      });
    } else if (name === "confirmPassword") {
      setUser({
        ...user,
        confirmPassword: value,
        passwordMatch: password === value,
      });
    } else {
      setUser({ ...user, [name]: value.trim() });
    }
  };

  const navigate = useNavigate();

  const SendData = () => {
    axios.post(`http://localhost:9000/create-user`, user).then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        Swal.fire(
          "Təbriklər",
          "Qeydiyyat uğurlu oldu. Siz giriş səhifəsinə yönləndirilirsiniz",
          "success"
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setUser(...user);
      } else {
        Swal.fire("Ugursuz Emeliyyat", "You clicked the button!", "warning");
      }
    });
  };

  return (
    <div className="form">
      <h1>Qeydiyyat</h1>
      <Input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onHandleChange}
      />
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onHandleChange}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onHandleChange}
      />
      <div className="phone">
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 150, height: 27 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0, height: 27 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              sx={{ height: 27 }}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <Input
          type="number"
          placeholder="Phone"
          name="phone"
          value={phone.slice(0, 9)}
          onChange={onHandleChange}
        />
      </div>
      <Input
        type={view}
        placeholder="Password"
        name="password"
        value={password}
        onChange={onHandleChange}
      />
      <Input
        type={view}
        placeholder="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onHandleChange}
      />
      {!passwordMatch && <div style={{ color: "red" }}>Şifrə eyni deyil</div>}
      <span onClick={toggleView}>
        <Icon style={{ fontSize: 26 }} />
      </span>
      <Button
        className={
          "register" +
          (email === "" ||
          password === "" ||
          name === "" ||
          phone === "" ||
          username === "" ||
          confirmPassword === "" ||
          passwordMatch === false
            ? "disabled"
            : "")
        }
        title="Register"
        onClick={SendData}
        disabled={
          email === "" ||
          password === "" ||
          name === "" ||
          phone === "" ||
          username === "" ||
          confirmPassword === "" ||
          passwordMatch === false
        }
      />
      <Link to="/login" style={{ marginTop: 45, fontSize: 26 }}>
        Giriş
      </Link>
    </div>
  );
};

export default Register;
