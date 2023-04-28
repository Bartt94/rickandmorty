import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { CharacterList } from "../src/pages/characterList.js";

const App = () => {
// function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <p className="text-center fs-2">RICK AND MORTY</p>
        </div>
        <br/>
        <div className="row justify-content-between">
          <input className="col-9" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success col-2" type="submit">Search</button>
        </div>
        <br/>
        <div className="row">
          <CharacterList></CharacterList>
        </div>
      </div>
    </>
  );
}

export default App;
