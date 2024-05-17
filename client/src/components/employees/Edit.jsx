import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpleado, editarEmpleado, vaciarEstado, obtenerPuestos } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Edit = () => {
  const [state, setState] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    edad: '',
    foto: '',
    curriculumVitae: '',
    fechaIngreso: '',
    puestoId: 0,
  });
  const [nuevaFoto, setNuevaFoto] = useState('');
  const [loading, setLoading] = useState('');
  const idEmpleado = useParams();
  const dispatch = useDispatch();
  const empleado = useSelector(state => state.empleado);
  const puestos = useSelector(state => state.puestos);
  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };
  const base64Imagen = (imagen) => {
    Array.from(imagen).forEach(archivo => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        setNuevaFoto(base64);
      };
      reader.onerror = (error) => {
        console.log('Error al leer el archivo:', error);
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const empleadoEditado = { ...state, nuevaFoto }
    dispatch(editarEmpleado(idEmpleado, empleadoEditado));
    history.push('/empleados');
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  }

  useEffect(() => {
    !empleado.length && dispatch(obtenerEmpleado(idEmpleado.id)).then(setLoading(true));
    dispatch(obtenerPuestos())
    return () => {
      dispatch(vaciarEstado());
    }
  }, [dispatch]);

  useEffect(() => {
    if (empleado) {
      setState({
        primerNombre: empleado.primerNombre,
        segundoNombre: empleado.segundoNombre,
        primerApellido: empleado.primerApellido,
        segundoApellido: empleado.segundoApellido,
        edad: empleado.edad,
        foto: empleado.foto,
        curriculumVitae: empleado.curriculumVitae,
        fechaIngreso: empleado.fechaIngreso,
        puestoId: empleado.Position?.puesto
      })
    }
  }, [empleado]);
  if (!loading) {
    return <h1>Cargando...</h1>
  }
  return (
    <div>
      <br />
      <div className="card">
        <div className="card-header">Datos del empleado</div>
        <div className="card-body">
          <form encType="multipart/form-data" onChange={handleChange}>
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
              <label className="form-label">Foto:</label> <br />
              <img src={empleado.foto} width="100" height="100" alt='No encontrada' /> <br /> <br />
              <input type="file" className="form-control" name="nuevaFoto" onChange={e => base64Imagen(e.target.files)} />
            </div>
            <div className="mb-3">
              <label className="form-label">CV(PDF):</label>
              <input type="file" className="form-control" name="curriculumVitae" />
            </div>
            <div className="mb-3">
              <label className="form-label">Puesto:</label>
              ///// revisar esto
              <select className="form-select form-select-sm" name="puestoId">
                <option selected>{state.puestoId}</option>
                {
                  puestos.map(puesto => (
                    <option key={puesto.id} value={puesto.id}>{puesto.puesto}</option>
                  ))
                }
              </select>
              /////
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de ingreso:</label>
              <input type="date" className="form-control" name="fechaIngreso" value={state.fechaIngreso} />
            </div>
            <button type="submit" className="btn btn-success" onClick={(e) => handleSubmit(e)}>Actualizar registro</button>
            <a className="btn btn-primary" href="/empleados" role="button">Cancelar</a>
          </form>
        </div>
        <div className="card-footer text-muted">
        </div>
      </div>
    </div>

  )
}

export default Edit;