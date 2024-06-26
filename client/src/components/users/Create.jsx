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
      <div className="card">
        <div className="card-header">Datos del usuario</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del usuario:</label>
              <input type="text" className="form-control" name="nombreUsuario" value={state.nombreUsuario} placeholder="Nombre del usuario" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input type="password" className="form-control" name="contraseña" value={state.contraseña} placeholder="Escriba su contraseña" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo:</label>
              <input type="email" className="form-control" name="correo" value={state.correo} placeholder="Escriba su correo electrónico" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">Agregar</button>
            <a className="btn btn-primary" href="/usuarios" role="button">Cancelar</a>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
      <br />
    </div>
  )
}

export default Create;