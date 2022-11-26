import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetDetails = (props) => {
  // Importa store y actions para poder funcionar a traves de context
  const { store, actions } = useContext(Context);
  // Params para rutas dinamicas
  const planetParam = useParams();
  //Use effect normal para ver que trae
  useEffect(() => {
    actions.getDetailsPlanet(planetParam.id);
  }, []);

  return (
    <>
      <div className="card d-flex p-5">
        <h1 className="card-title text-center text-uppercase p-1">
          {store.planet?.name}
        </h1>
        {store.planet.name === "Tatooine" ? (
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg"
            }
            className="img-fluid rounded-circle mx-auto d-block"
            style={{ width: "18rem" }}
            alt="..."
          />
        ) : (
          <img
            src={
              "https://starwars-visualguide.com/assets/img/planets/" +
              planetParam.id +
              ".jpg"
            }
            className="img-fluid rounded-circle mx-auto d-block"
            style={{ width: "18rem" }}
            alt="..."
          />
        )}
        <div className="p-5">
          <h5 className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, iste
            impedit similique ex soluta at sapiente fuga maxime magni molestias
            placeat quis sed asperiores molestiae reiciendis tempore inventore
            animi corrupti.
          </h5>
        </div>
      </div>
      <div className="container col-md-8">
        <div className="card-body ">
          <div className="row row-cols-auto text-center gx-5 d-flex">
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Name:</strong> {store.planet?.name}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Climate:</strong> {store.planet?.climate}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Population:</strong> {store.planet?.population}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Orbital Period:</strong> {store.planet?.orbital_period}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Rotation:</strong> {store.planet?.rotation_period}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Diameter:</strong> {store.planet?.diameter}
            </h4>
          </div>
        </div>
      </div>
      <Link to="/">
        <span
          className="btn btn-primary btn-lg fas-arrow-right"
          href="#"
          role="button"
        >
          <i className="fa fa-arrow-left"></i> Back home
        </span>
      </Link>
    </>
  );
};

PlanetDetails.propTypes = {
  match: PropTypes.object,
};
