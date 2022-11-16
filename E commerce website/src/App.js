import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import EditPage from "./components/Edit";
import "./App.css";
import List from "./components/ListView";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <SearchBar />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<List />}
          />

          <Route
            exact
            path="/edit"
            element={<EditPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
