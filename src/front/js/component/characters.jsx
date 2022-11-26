import React, { Component, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Characters = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid ">
      <h1 className="h1 pb-2 mb-4 text-dark border-bottom border-dark">
        <strong>Characters</strong>
      </h1>
      <div className="card-group">
        <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-sm-center justify-content-lg-between w-100">
          {store.characters.map((character, id) => (
            <div
              className="card col-6 col-sm-6 col-md-4 "
              style={{ width: "18rem" }}
              key={id}
            >
              <img
                src={
                  "https://starwars-visualguide.com/assets/img/characters/" +
                  (id + 1) +
                  ".jpg"
                }
                className=" img-fluid rounded p-1"
                alt="..."
              />
              <div className="card-body ">
                <h5 className="card-title h4 pb-2 mb-4 text-dark border-bottom border-info">
                  <strong>{character.name}</strong>
                </h5>
                <p className="card-text">Eye color: {character.eye_color}</p>
                <p className="card-text">Hair color: {character.hair_color}</p>
                <p className="card-text">Gender: {character.gender}</p>
                <Link
                  type="Button"
                  to={"/characterDetails/" + (id + 1)}
                  className="btn btn-outline-info"
                >
                  Learn more!
                </Link>
                <button
                  type="button"
                  onClick={() => actions.getFavorites(character.name)}
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
