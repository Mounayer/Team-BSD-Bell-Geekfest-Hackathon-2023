import { useState, useEffect } from "react";
import { getUser } from "../auth";

const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []);

  return user;
};

export default useUser;
