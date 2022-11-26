import React, { Component, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Planets = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid row">
      <h1 className="h1 pb-2 mb-4 text-dark border-bottom border-dark">
        <strong>Planets</strong>
      </h1>
      <div className="card-group">
        <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-sm-center justify-content-lg-between w-100">
          {store.planets.map((planet, id) => (
            <div
              className="card col-6 col-sm-6 col-md-4"
              style={{ width: "18rem" }}
              key={id}
            >
              {id === 0 ? (
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg"
                  }
                  className="card-img-top rounded-circle p-1"
                  alt="..."
                />
              ) : (
                <img
                  src={
                    "https://starwars-visualguide.com/assets/img/planets/" +
                    (id + 1) +
                    ".jpg"
                  }
                  className="card-img-top rounded-circle p-1"
                  alt="..."
                />
              )}
              <div className="card-body ">
                <h5 className="card-title h4 pb-2 mb-4 text-dark border-bottom border-info">
                  <strong>{planet.name}</strong>
                </h5>
                <p className="card-text">Population: {planet.population}</p>
                <p className="card-text">Terrain: {planet.terrain} </p>
                <Link
                  type="Button"
                  to={"/planetDetails/" + (id + 1)}
                  className="btn btn-outline-info"
                >
                  Learn more!
                </Link>
                <button
                  type="button"
                  onClick={() => actions.getFavorites(planet.name)}
                  className="btn btn-outline-warning"
                  style={{ float: "right" }}
                >
                  <i className="fa fa-heart text-danger"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
