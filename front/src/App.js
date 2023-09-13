import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter } from "react-router-dom";

import Layout from "./layout";
import { UserContextProvider } from "./components/UserContext";
import AccountPage from "./components/AccountPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
