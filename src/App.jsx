/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import LogInpage from "./components/LogInpage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#4c4949] text-sky-400">
        <ul>
          <li>
            <Link to="/">
              <button>SignIn</button>
            </Link>
          </li>
          <li>
            <Link to="/SignUp">
              <button>SignUp</button>
            </Link>
          </li>
        </ul>
      </div>
      <br></br>
      <br></br>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/SignUp" element={<Signup />}></Route>
        <Route path="/loginapp" element={<LogInpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
