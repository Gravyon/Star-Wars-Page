import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const VehicleDetails = () => {
  const vehicleParam = useParams();

  useEffect(() => {
    actions.getDetailsVehicle(vehicleParam.id);
  }, []);

  return (
    <div className="card mb-3">
      <div className="col-md-4">
        <img
          src={
            "https://starwars-visualguide.com/assets/img/vehicles/" +
            vehicleParam.id +
            ".jpg"
          }
          className="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title "></h5>
          <div className="row row-cols-auto text-center gx-5 d-flex">
            <div className="card col-xl col-md-4 col-sm">
              Name: {store.vehicle.name}
            </div>
            <div className="card col-xl col-md-4 col-sm">
              Manufacturer: {store.vehicle.manufacturer}
            </div>
            <div className="card col-xl col-md-4 col-sm">
              Cost: {store.vehicle.cost_in_credits} credits
            </div>
            <div className="card col-xl col-md-4 col-sm">
              Speed: {store.vehicle.max_atmosphering_speed}
            </div>
            <div className="card col-xl col-md-4 col-sm">
              Model: {store.vehicle.model}
            </div>
            <div className="card col-xl col-md-4 col-sm">
              Class: {store.vehicle.vehicle_class}
            </div>
          </div>
        </div>
      </div>
      <Link to="/">
        <span className="btn btn-primary btn-lg " href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

VehicleDetails.propTypes = {
  match: PropTypes.object,
};
