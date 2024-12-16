import { useEffect } from "react";
import { db } from "./firebase";

const App = () => {
  useEffect(() => {
    console.log("Firebase Initialized", db);
  }, []);

  return <h1>Hello, Social Media Feed!</h1>;
};

export default App;
