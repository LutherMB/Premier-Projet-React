import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import Profil from "./pages/Profil";
import Header from "./components/Header";
import Error from "./components/Error";
import axios from "axios";
import { UidContext } from "./utils/Context";
import { axiosUser, axiosUsers } from "./feature/user.slice";
import { useDispatch } from "react-redux";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifie si l'utilisateur possède un token
    const toFetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/jwtid`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
        },
      })
        .then(async (res) => {
          setUid(res.data.userId);
          console.log(`The State "uid" is : ${uid}`);
          await dispatch(axiosUser(res.data.userId));
          await dispatch(axiosUsers());
        })
        .catch((err) => console.log("No token"));
    };
    toFetchToken();
  });
  // }, [checkedToken]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <Header />
        <Routes>
          {uid === null ? (
            <Fragment>
              <Route path="/connexion" element={<Connexion />} />
              <Route
                path="*"
                element={<Navigate to="/connexion" replace={true} />}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/" element={<Home />} />
              <Route path="/profil" element={<Profil />} />
              <Route
                path="/connexion"
                element={<Navigate to="/" replace={true} />}
              />
              <Route path="*" element={<Error />} />
            </Fragment>
          )}
        </Routes>
      </Router>
    </UidContext.Provider>
  );
}

export default App;
