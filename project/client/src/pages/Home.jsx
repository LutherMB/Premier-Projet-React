import React, { Fragment } from "react";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";

function Home() {
  return (
    <Fragment>
      <LeftNav />
      <div className="home">
        <div className="main">
          <Thread />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
