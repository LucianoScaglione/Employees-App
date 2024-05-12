import { useState } from "react";
import { useDispatch } from "react-redux";
import { crearEmpleado } from "../../redux/actions";

const Create = () => {
  const [state, setState] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    edad: '',
    curriculumVitae: '',
    puesto: '',
    fechaIngreso: ''
  });
  const [foto, setFoto] = useState('');

  const dispatch = useDispatch();

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
      puesto: '',
      fechaIngreso: ''
    });
    setFoto('');
  };
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
            <div class="mb-3">
              <label class="form-label">Segundo nombre</label>
              <input type="text" class="form-control" name="segundoNombre" value={state.segundoNombre} placeholder="Segundo nombre" />
            </div>
            <div class="mb-3">
              <label class="form-label">Primer apellido</label>
              <input type="text" class="form-control" name="primerApellido" value={state.primerApellido} placeholder="Primer apellido" />
            </div>
            <div class="mb-3">
              <label class="form-label">Segundo apellido</label>
              <input type="text" class="form-control" name="segundoApellido" value={state.segundoApellido} placeholder="Segundo apellido" />
            </div>
            <div class="mb-3">
              <label class="form-label">Edad</label>
              <input type="text" class="form-control" name="edad" value={state.edad} placeholder="Edad" />
            </div>
            <div class="mb-3">
              <label class="form-label">Foto:</label>
              <input type="file" class="form-control" accept="image/png, image/jpeg" name="foto" defaultValue={foto} onChange={e => convertirBase64(e.target.files)} />
            </div>
            <div class="mb-3">
              <label class="form-label">CV(PDF):</label>
              <input type="file" class="form-control" name="curriculumVitae" />
            </div>
            <div class="mb-3">
              <label class="form-label">Puesto:</label>
              <select class="form-select form-select-sm" name="puesto" value={state.puesto} >
                <option selected>Seleccione uno</option>
                <option value="Programador Trainee">Programador Trainee</option>
                <option value="Programador Junior">Programador Junior</option>
                <option value="Programador Semi Senior">Programador Semi Senior</option>
                <option value="Programador Senior">Programador Senior</option>
                <option value="Tester Qa">Tester Qa</option>
                <option value="Líder de proyectos">Líder de proyectos</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Fecha de ingreso:</label>
              <input type="date" class="form-control" name="fechaIngreso" value={state.fechaIngreso} />
            </div>
            <button type="submit" class="btn btn-success">Agregar registro</button>
            <a class="btn btn-primary" href="/empleados" role="button">Cancelar</a>
          </form>
        </div>
        <div className="card-footer text-muted">
        </div>
      </div>
    </div>
  )
}

export default Create;