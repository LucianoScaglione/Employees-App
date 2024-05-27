import { useState, useEffect } from "react";
import { informacionUsuario } from "./redux/actions";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

export const isAuthenticated = () => {
  const usuario = informacionUsuario();
  return usuario;
}

const PrivatesRoutes = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const checkAuthentication = () => {
      const usuarioLogueado = isAuthenticated();
      setUser(usuarioLogueado);
    };
    checkAuthentication();
  }, []);

  if (user === null) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user || !user.usuario) {
    return <Navigate to='/loguearse' />
  }
  return (
    <Outlet />
  )
}


export default PrivatesRoutes;
