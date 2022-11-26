import React, { Component, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Vehicles = () => {
  const { store, actions } = useContext(Context);
  console.log(useContext(Context));

  return (
    <div className="container-fluid row">
      <h1>Vehicles</h1>
      {store.vehicles.map((vehicle, id) => (
        <div className="card col-md-4 col-sm-8" key={id}>
          <img
            src={
              "https://starwars-visualguide.com/assets/img/vehicles/" +
              (id + 1) +
              ".jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body ">
            <h5 className="card-title">{vehicle.name}</h5>
            <p className="card-text">Model: {vehicle.model}</p>
            <p className="card-text">Manufacturer: {vehicle.manufacturer}</p>
            <p className="card-text">Cost: {vehicle.cost_in_credits} credits</p>
            <Link
              type="Button"
              to={"/vehicleDetails/" + (id + 1)}
              className="btn btn-primary"
            >
              Learn more!
            </Link>
            <div
              type="button"
              className="btn btn-white"
              style={{ float: "right" }}
            >
              <i className="fa fa-heart text-danger"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
