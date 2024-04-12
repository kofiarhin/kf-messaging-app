import "./App.scss";
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return <div>App</div>;
};

export default App;
