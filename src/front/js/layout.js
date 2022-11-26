import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home.jsx";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import { CharacterDetails } from "./pages/characterDetails.jsx";
import { PlanetDetails } from "./pages/planetDetails.jsx";
import { VehicleDetails } from "./pages/vehicleDetails.jsx";
import { Login } from "./component/login.jsx";
import { Register } from "./component/register.jsx";
import { useContext } from "react";
import { Context } from "./store/appContext";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store } = useContext(Context);
  let auth = store.auth;
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />{" "}
            <Route element={<Login />} path="/login" />{" "}
            <Route element={<Register />} path="/register" />{" "}
            {auth ? (
              <Route
                element={<CharacterDetails />}
                path="/characterDetails/:id"
              />
            ) : (
              <Route element={<Login />} path="/characterDetails/:id" />
            )}
            {auth ? (
              <Route
                element={<PlanetDetails />}
                exact
                path="/planetDetails/:id"
              />
            ) : (
              <Route element={<Login />} path="/planetDetails/:id" />
            )}
            {/* <Route exact path="/vehicleDetails/:id">
							<VehicleDetails />
						</Route> */}
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
