import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Login.css";
import logo_vertical from "../../assets/logo_vertical.png";

const client = axios.create({
  baseURL: "http://127.0.0.1:3000/api/user",
});

export default function Login() {
  const { token, setToken } = useContext(AuthContext);

  async function getToken() {
    let response = await client.post("/login", {
      email: "michael@unicesar.edu.co",
      password: "Empanada123#",
    });
    setToken(response.data.token);
  }

  const enviar = () => {
    getToken();

    if (!token) {
      return "no token";
    }
  };

  return (
    <>
      <div className="container">
        <div className="imagen">
          <img src={logo_vertical} alt="logo repo upc" />
        </div>
        <form id="login">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="ejemplo@unicesar.edu.co"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
          />
          <a href="" className="olvido">
            Olvidó su contraseña?
          </a>
          <button type="submit" id="enviar">
            ACCEDER
          </button>
          <a href="" className="crear">
            Crear una cuenta
          </a>
        </form>
      </div>
    </>
  );
}
