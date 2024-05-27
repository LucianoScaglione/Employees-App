import { useState } from "react";
import { useDispatch } from "react-redux";
import { loguearUsuario } from "../../redux/actions";
import { Navigate } from "react-router";
import { isAuthenticated } from "../../PrivatesRoutes";

const Login = () => {
  const [state, setState] = useState({
    nombreUsuario: "",
    contraseña: ""
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loguearUsuario(state));
    setState({
      nombreUsuario: "",
      contraseña: ""
    });
  };

  const user = isAuthenticated();

  if (user && user.usuario) {
    return <Navigate to='/' replace />;
  }

  return (
    <main className="container">
      <br />
      <br />
      <div className="row">
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Iniciar sesión</div>
            <div className="card-body">
              {/* {
                existeError && (
                  <div className="alert alert-danger" role="alert">
                    <strong>Error: El usuario o contraseña son incorrectos</strong>
                  </div>
                )
              } */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Usuario:</label>
                  <input type="text" className="form-control" name="nombreUsuario" value={state.nombreUsuario} placeholder="Escriba su usuario" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                  <input type="password" className="form-control" name="contraseña" value={state.contraseña} placeholder="Escriba su contraseña" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Entrar al sistema</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login;