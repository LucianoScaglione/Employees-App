import { useState } from "react";
import { crearUsuario } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Create = () => {
  const [state, setState] = useState({
    nombreUsuario: "",
    contraseña: "",
    correo: ""
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
    dispatch(crearUsuario(state));
    setState({
      nombreUsuario: "",
      contraseña: "",
      correo: ""
    });
  };

  return (
    <div>
      <div class="card">
        <div class="card-header">Datos del usuario</div>
        <div class="card-body">
          <form onChange={handleChange}>
            <div class="mb-3">
              <label class="form-label">Nombre del usuario:</label>
              <input type="text" class="form-control" name="nombreUsuario" value={state.nombreUsuario} placeholder="Nombre del usuario" />
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña:</label>
              <input type="password" class="form-control" name="contraseña" value={state.contraseña} placeholder="Escriba su contraseña" />
            </div>
            <div class="mb-3">
              <label class="form-label">Correo:</label>
              <input type="email" class="form-control" name="correo" value={state.correo} placeholder="Escriba su correo electrónico" />
            </div>
            <button type="submit" class="btn btn-success" onClick={(e) => handleSubmit(e)}>Agregar</button>
            <a class="btn btn-primary" href="/usuarios" role="button">Cancelar</a>
          </form>
        </div>
        <div class="card-footer text-muted"></div>
      </div>

    </div>
  )
}

export default Create;