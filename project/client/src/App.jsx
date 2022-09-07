// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import Header from "./components/Header";
import Error from "./components/Error";
import axios from "axios";
import { UidContext } from "./utils/Context";

function App() {
  // const [checkedToken, setCheckedToken] = useState(false);
  const [uid, setUid] = useState(null);

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
        .then((res) => {
          console.log(res.data);
          setUid(res.data.userId);
          console.log(`The State "uid" is : ${uid}`);
          // setCheckedToken(true);
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
