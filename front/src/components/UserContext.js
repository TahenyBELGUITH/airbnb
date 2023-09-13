import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const getProfile = async () => {
    try {
      await axios
        .get("/profile")
        .then((data) => {
          console.log("fetched user: ", data);
        })
        .catch((err) => {
          console.log("@GET/profile ", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      // getProfile();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
