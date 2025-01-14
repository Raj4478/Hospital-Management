import React from "react";
import { useState } from "react";
import Login from "./Pages/Login.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
    </>
  );
}

export default App;
