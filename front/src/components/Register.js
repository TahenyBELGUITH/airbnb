import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (ev) => {
    ev.preventDefault();
    try {
      axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful, Now you can log in");
    } catch (e) {
      alert("Registration failed! Please try later");
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-12">
        <h1 className="text-4xl text-center mb-4"> Register </h1>
        <form className="max-w-lg mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member ?{" "}
            <Link to={"/login"} className="text-black underline">
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
