import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);
  if (ready && !user) return <Navigate to={"/login"} />;
  return ready ? (
    <div>Loading ... </div>
  ) : (
    <div>
      <h1>Hello {user?.name}</h1>
    </div>
  );
};

export default AccountPage;
