import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetails = () => {
  // Importa store y actions para poder funcionar a traves de context
  const { store, actions } = useContext(Context);
  // Params para rutas dinamicas
  const characterParam = useParams();
  //Use effect normal para ver que trae
  useEffect(() => {
    actions.getDetailsCharacter(characterParam.id);
  }, []);

  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-8 my-4 m-auto h-100">
        <h3 className="card-title text-center text-uppercase">
          {store.character?.name}
        </h3>
        <img
          src={
            "https://starwars-visualguide.com/assets/img/characters/" +
            characterParam.id +
            ".jpg"
          }
          className="img-fluid rounded mx-auto d-block p-1 border-info"
          style={{ width: "300px" }}
          alt="..."
        />
        <div className="p-5">
          <h5 className="card-title ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            quod voluptatibus consequuntur est eum, provident soluta dignissimos
            praesentium exercitationem modi quis veniam esse, unde dolor, quo
            illo inventore vel? Ratione.
          </h5>
        </div>
      </div>
      <div className="container col-md-8">
        <div className="card-body ">
          <div className="row row-cols-auto text-center gx-5 d-flex">
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Name:</strong> {store.character?.name}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Birth Year:</strong> {store.character?.birth_year}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Gender:</strong> {store.character?.gender}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Height:</strong> {store.character?.height}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Skin Color:</strong> {store.character?.skin_color}
            </h4>
            <h4 className="container-fluid col-xl col-md-4 col-sm">
              <strong>Eye Color:</strong> {store.character?.eye_color}
            </h4>
          </div>
        </div>
      </div>
      <Link to="/">
        <span className="btn btn-primary btn-lg  " role="button">
          <i className="fa fa-arrow-left"></i> Back home
        </span>
      </Link>
    </>
  );
};

CharacterDetails.propTypes = {
  match: PropTypes.object,
};
