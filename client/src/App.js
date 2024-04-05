import { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const App = () => {
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (res.ok) {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUsers();
  }, []);
  return <div>App</div>;
};

export default App;
