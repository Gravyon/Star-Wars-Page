import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    //Declaracion de variables, arrays y objectos para ser utilizados en funciones y otros archivos
    store: {
      character: {},
      characters: [],
      planet: {},
      planets: [],
      vehicle: {},
      vehicles: [],
      favorites: [],
      auth: false,
      profile: {},
    },
    actions: {
      // Use getActions to call a function within a fuction
      userProfile: async () => {
        const userToken = localStorage.getItem("token");
        try {
          const response = await axios.get("/api/profile", {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          });
          // console.log(data)
          setStore({
            profile: response.data.user,
          });
          return true;
        } catch (error) {
          console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },
      checkToken: async () => {
        const userToken = localStorage.getItem("token");
        try {
          const response = await axios.get("/api/valid-token", {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          });
          // console.log(data)
          setStore({
            auth: response.data.status,
          });
          return true;
        } catch (error) {
          console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        setStore({
          auth: false,
        });
        return false;
      },
      register: async (username, name, lastname, password, email) => {
        try {
          const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({
              username: username,
              name: name,
              lastname: lastname,
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem("token", data.msg);
            console.log(data);
            setStore({
              auth: true,
            });
            return true;
          }
        } catch (error) {
          console.log(error);
        }
      },
      login: async (email, password) => {
        try {
          const response = await axios.post("/api/login", {
            email: email,
            password: password,
          });
          localStorage.setItem("token", response.data.msg);
          // console.log(data)
          setStore({
            auth: true,
          });
          return true;
        } catch (error) {
          console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            alert(error.response.data.msg);
          }
        }
      },
      // Characters fetch
      getCharacters: async () => {
        try {
          const response = await fetch("https://swapi.dev/api/people/");
          const data = await response.json();
          console.log(data.results);
          setStore({
            characters: data.results,
          });
        } catch (err) {
          console.log(err);
        }
      },
      // Planets fetch
      getPlanets: async () => {
        try {
          const response = await fetch("https://swapi.dev/api/planets/");
          const data = await response.json();
          console.log(data.results);
          setStore({
            planets: data.results,
          });
        } catch (err) {
          console.log(err);
        }
      },
      // Vehicles fetch, no se utiliza por que la API no tiene todos los datos
      // No anda bien
      // getVehicles: async () => {

      //     try {
      //         const response = await fetch("https://swapi.dev/api/vehicles/")
      //         const data = await response.json()
      //         console.log(data.results)
      //         setStore({
      //             vehicles: data.results
      //         });
      //     } catch (err) {
      //         console.log(err)
      //     }
      // },
      // Detailed characters, individuales con parametro id para poder ser dinamico
      getDetailsCharacter: async (id) => {
        try {
          const response = await fetch("https://swapi.dev/api/people/" + id);
          const data = await response.json();
          setStore({
            character: data,
          });
        } catch (err) {
          console.log(err);
        }
      },
      //Detailed planets, individuales con parametro id para poder ser dinamico
      getDetailsPlanet: async (id) => {
        try {
          const response = await fetch("https://swapi.dev/api/planets/" + id);
          const data = await response.json();
          setStore({
            planet: data,
          });
        } catch (err) {
          console.log(err);
        }
      },
      getDetailsVehicle: async (id) => {
        try {
          const response = await fetch("https://swapi.dev/api/vehicles/" + id);
          const data = await response.json();
          setStore({
            vehicle: data,
          });
        } catch (err) {
          console.log(err);
        }
      },
      getFavorites: (itemFavorito) => {
        const store = getStore();
        if (store.favorites.includes(itemFavorito)) {
          getActions().removeFavorite(itemFavorito);
          // setListaTareas([...listaTareas, {tarea}])
        }
        //{label : tarea, done : false}
        else {
          setStore({
            favorites: [...store.favorites, itemFavorito],
          });
        }
      },
      removeFavorite: (itemFavorito) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter((item) => item !== itemFavorito),
        });
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({
          demo: demo,
        });
      },
    },
  };
};

export default getState;
