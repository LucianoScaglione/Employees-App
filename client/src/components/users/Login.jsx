import { useState } from "react";
import { useDispatch } from "react-redux";
import { loguearUsuario } from "../../redux/actions";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loguearUsuario(state));
    setState({
      nombreUsuario: "",
      contraseña: ""
    });
  };

  return (
    <main class="container">
      <br />
      <br />
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">Iniciar sesión</div>
            <div class="card-body">
              {/* {
                existeError && (
                  <div class="alert alert-danger" role="alert">
                    <strong>Error: El usuario o contraseña son incorrectos</strong>
                  </div>
                )
              } */}
              <form onChange={handleChange}>
                <div class="mb-3">
                  <label class="form-label">Usuario:</label>
                  <input type="text" class="form-control" name="nombreUsuario" value={state.nombreUsuario} placeholder="Escriba su usuario" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Contraseña:</label>
                  <input type="password" class="form-control" name="contraseña" value={state.contraseña} placeholder="Escriba su contraseña" />
                </div>
                <button type="submit" class="btn btn-primary" onClick={(e) => handleSubmit(e)}>Entrar al sistema</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login;