import { useCallback, useEffect } from "react";
import { db } from "./firebase";

const App = () => {
  const getItems = useCallback(async () => {
    const users = await db.users.all();
    users.forEach((user) => {
      console.log(user.data);
    });
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return <>APP</>;
};

export default App;
