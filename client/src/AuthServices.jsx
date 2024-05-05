import { informacionUsuario } from "./redux/actions";

export const isAuthenticated = () => {
  const usuario = informacionUsuario();
  console.log("AuthServices es: ", usuario.token)
  return usuario;
}
