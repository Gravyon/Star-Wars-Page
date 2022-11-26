import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  let redirect = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let loggedIn = actions.login(email, password);
    setEmail("");
    setPassword("");
    loggedIn ? redirect("/") : null;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    redirect("/register");
  };

  return (
    <form className="container p-5 mt-5 mb-5 w-auto" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          required
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-outline-primary mt-3 mb-3">
          Login
        </button>
        <button
          type="submit"
          onClick={handleRegister}
          className="btn btn-outline-success mt-3 mb-3 w-auto"
        >
          Not registered? Click here!
        </button>
      </div>
    </form>
  );
};
