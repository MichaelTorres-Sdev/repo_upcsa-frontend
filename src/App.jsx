/* import axios from "axios";
import React from "react";

const client = axios.create({
  baseURL: "http://127.0.0.1:3000/api/repository/listbyname",
}); */

import Login from "./pages/login/Login.jsx";

function App() {
  /* const [repositories, setrepositories] = React.useState(null);

  React.useEffect(() => {
    async function getrepositories() {
      let response = await client.get();
      response = response.data;
      setrepositories(JSON.stringify(response.repositories));
    }
    getrepositories();
  }, []);

  if (!repositories) return "No repositories!"; */

  return (
    <>
      <Login />
    </>
  );
}

export default App;
