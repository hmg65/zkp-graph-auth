import { Routes, Route } from "react-router-dom";
import "./App.css";
import OldLoginSignup from "./components/OldLoginSignup";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ZKP from "./components/ZKP"

function App() {
  return (
  <div>
    <Routes>
      
      <Route
        path="/zkp"
        element={
          <ZKP />
        }
      />

      <Route
        path="/"
        element={
          <Login />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup />
        }
      />

      <Route
        path="/zkp"
        element={
          <ZKP />
        }
      />

    </Routes>
  </div>
  );
}

export default App;
