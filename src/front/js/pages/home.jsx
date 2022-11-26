import React, { Component, useEffect, useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Characters } from "../component/characters.jsx";
import { Planets } from "../component/planets.jsx";
import { Vehicles } from "../component/vehicles.jsx";
import { Login } from "../component/login.jsx";
import { Context } from "../store/appContext";
import { Register } from "../component/register.jsx";

export const Home = () => {
  const { store } = useContext(Context);
  let auth = store.auth;
  return (
    <>
      <div className="container-fluid p-3 border">
        {!auth ? <Login /> : null}
      </div>
      <div className="container-fluid p-3 border">
        {auth ? <Characters /> : null}
      </div>
      <div className="container-fluid p-3 border">
        {auth ? <Planets /> : null}
      </div>
    </>
  );
};
