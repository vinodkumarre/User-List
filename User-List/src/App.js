import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import EditPage from "./components/Edit";
import "./App.css";
// eslint-disable-next-line import/no-cycle
import List from "./components/ListView";
// import SearchBar from "./components/SearchBar";
import AddUser from "./components/AddUser";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<List />}
      />

      <Route
        exact
        path="/edit/:id"
        element={<EditPage />}
      />
      <Route
        exact
        path="/addUser"
        element={<AddUser />}
      />
    </Routes>
  );
}

export default App;
