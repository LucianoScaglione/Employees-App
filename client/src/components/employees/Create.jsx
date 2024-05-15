import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearEmpleado, obtenerPuestos } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [state, setState] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    edad: '',
    curriculumVitae: '',
    fechaIngreso: '',
    puestoId: 0
  });
  const [foto, setFoto] = useState('');

  const puestos = useSelector(state => state.puestos);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const convertirBase64 = (imagen) => {
    Array.from(imagen).forEach(archivo => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        setFoto(base64);
      };
      reader.onerror = (error) => {
        console.log('Error al leer el archivo:', error);
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosEmpleado = { ...state, foto };
    dispatch(crearEmpleado(datosEmpleado));
    setState({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      edad: '',
      curriculumVitae: '',
      fechaIngreso: '',
      puestoId: 0
    });
    setFoto('');
    history.push("/empleados");
  };

  useEffect(() => {
    dispatch(obtenerPuestos())
  }, [dispatch]);
  return (
    <div>
      <br />
      <div className="card">
        <div className="card-header">Datos del empleado</div>
        <div className="card-body">
          <form encType="multipart/form-data" onChange={handleChange} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Primer nombre</label>
              <input type="text" className="form-control" name="primerNombre" value={state.primerNombre} placeholder="Primer nombre" />
            </div>
            <div className="mb-3">
              <label className="form-label">Segundo nombre</label>
              <input type="text" className="form-control" name="segundoNombre" value={state.segundoNombre} placeholder="Segundo nombre" />
            </div>
            <div className="mb-3">
              <label className="form-label">Primer apellido</label>
              <input type="text" className="form-control" name="primerApellido" value={state.primerApellido} placeholder="Primer apellido" />
            </div>
            <div className="mb-3">
              <label className="form-label">Segundo apellido</label>
              <input type="text" className="form-control" name="segundoApellido" value={state.segundoApellido} placeholder="Segundo apellido" />
            </div>
            <div className="mb-3">
              <label className="form-label">Edad</label>
              <input type="text" className="form-control" name="edad" value={state.edad} placeholder="Edad" />
            </div>
            <div className="mb-3">
              <label className="form-label">Foto:</label>
              <input type="file" className="form-control" accept="image/png, image/jpeg" name="foto" defaultValue={foto} onChange={e => convertirBase64(e.target.files)} />
            </div>
            <div className="mb-3">
              <label className="form-label">CV(PDF):</label>
              <input type="file" className="form-control" name="curriculumVitae" />
            </div>
            <div className="mb-3">
              <label className="form-label">Puesto:</label>
              <select className="form-select form-select-sm" name="puestoId">
                <option selected>Seleccione uno</option>
                {
                  puestos.map(puesto => (
                    <option value={puesto.id}>{puesto.puesto}</option>
                  ))
                }
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de ingreso:</label>
              <input type="date" className="form-control" name="fechaIngreso" value={state.fechaIngreso} />
            </div>
            <button type="submit" className="btn btn-success">Agregar registro</button>
            <a className="btn btn-primary" href="/empleados" role="button">Cancelar</a>
          </form>
        </div>
        <div className="card-footer text-muted">
        </div>
      </div>
    </div>
  )
}

export default Create;