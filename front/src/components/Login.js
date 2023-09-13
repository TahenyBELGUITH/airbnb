import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      // console.log(email, password);
      if (email.length && password.length) {
        const res = await axios.post("http://localhost:4000/login", {
          email,
          password,
        });
        if (res.status === 200 && res.data.loggedUser) {
          console.log(res.data);
          navigate("/account");
        }
      } else {
        alert("remplir champs...");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4"> Login </h1>
        <form className="max-w-lg mx-auto" onSubmit={handleLoginSubmit}>
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
          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            don't have an account yet?{" "}
            <Link to={"/register"} className="text-black underline">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
