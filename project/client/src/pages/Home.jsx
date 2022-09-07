import React, { Fragment } from "react";
import LeftNav from "../components/LeftNav";

function Home() {
  return (
    <Fragment>
      <LeftNav />
      <div className="home">
        <h1>Hello depuis Home 👋</h1>
      </div>
    </Fragment>
  );
}

export default Home;
