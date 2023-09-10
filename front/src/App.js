import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Layout from "./layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
