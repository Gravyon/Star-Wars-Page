import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  let redirect = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let loggedIn = actions.register(username, name, lastname, password, email);
    setName("");
    setUsername("");
    setLastname("");
    setEmail("");
    setPassword("");
    loggedIn ? redirect("/home") : null;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    redirect("/login");
  };

  return (
    <form
      className="container p-5 mt-5 mb-5 w-50 has-validation"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="exampleInputUsername">Username</label>
        <input
          className="form-control"
          id="exampleInputUsername"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputName">Name</label>
        <input
          className="form-control"
          id="exampleInputName"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputLastname">Last Name</label>
        <input
          className="form-control"
          id="exampleInputLastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          placeholder="Last Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter email"
          required
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-outline-primary mt-3 mb-3">
          Register
        </button>
        <button
          type="submit"
          onClick={handleRegister}
          className="btn btn-outline-success mt-3 mb-3 w-auto"
        >
          Already registered? Login!
        </button>
      </div>
    </form>
  );
};
