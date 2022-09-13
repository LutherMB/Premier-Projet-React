import React, { Fragment } from "react";
import LeftNav from "../components/LeftNav";
import NewPost from "../components/Post/NewPost";
import Thread from "../components/Thread";

function Home() {
  return (
    <Fragment>
      <LeftNav />
      <div className="home">
        <div className="main">
          <div className="home-header">
            <NewPost />
          </div>
          <Thread />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
