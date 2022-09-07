import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import Header from "./components/Header";
import Error from "./components/Error";
import axios from "axios";
import { UidContext } from "./utils/Context";
// import * as userActions from "./feature/user.slice";
import { axiosUser } from "./feature/user.slice";
import { useDispatch } from "react-redux";

function App() {
  // const [checkedToken, setCheckedToken] = useState(false);
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
          // setCheckedToken(true);
        })
        .catch((err) => console.log("No token"));
    };
    toFetchToken();
  }, [dispatch, uid]);
  // }, [checkedToken]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UidContext.Provider>
  );
}

export default App;
