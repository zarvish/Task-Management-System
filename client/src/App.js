import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";

import CreateTask from "./scenes/CreateTask";
import Home from "./scenes/Home";
import EditTask from "./scenes/EditTask";
import { Provider } from "react-redux";
import rootReducer from "./store";
import { configureStore } from "@reduxjs/toolkit";

function App() {
  const store = configureStore({
    reducer: rootReducer,
  });
  return (
    <Provider store={store}>
      <div className="App">
        <AppLayout>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-task" element={<CreateTask />} />
              <Route path="/edit-task" element={<EditTask />} />
            </Routes>
          </Router>
        </AppLayout>
      </div>
    </Provider>
  );
}

export default App;
