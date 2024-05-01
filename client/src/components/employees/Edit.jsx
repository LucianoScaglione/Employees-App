import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpleado, editarEmpleado, vaciarEstado } from "../../redux/actions";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [state, setState] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    edad: '',
    foto: '',
    curriculumVitae: '',
    puesto: ''
  });
  const [loading, setLoading] = useState(false);
  const idEmpleado = useParams();
  const dispatch = useDispatch();
  const empleado = useSelector(state => state.empleado);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarEmpleado(idEmpleado, state));
  }

  useEffect(() => {
    !empleado.length && dispatch(obtenerEmpleado(idEmpleado.id)).then(setLoading(true));
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
        puesto: empleado.puesto
      })
    }
  }, [empleado]);
  if (!loading) {
    return <h1>Cargandoo</h1>
  }
  return (
    <div>
      <div>
        <form onChange={handleChange}>
          <input type="text" name="primerNombre" defaultValue={state.primerNombre} />
          <input type="text" name="segundoNombre" defaultValue={state.segundoNombre} />
          <input type="text" name="primerApellido" defaultValue={state.primerApellido} />
          <input type="text" name="segundoApellido" defaultValue={state.segundoApellido} />
          <input type="number" name="edad" defaultValue={state.edad} />
          <select name="puesto">
            <option hidden>{state.puesto}</option>
            <option value="Programador Trainee">Programador Trainee</option>
            <option value="Programador Junior">Programador Junior</option>
            <option value="Programador Semi Senior">Programador Semi Senior</option>
            <option value="Programador Senior">Programador Senior</option>
            <option value="Tester Js">Tester Js</option>
            <option value="Líder de proyectos">Líder de proyectos</option>
          </select>
          <input type="submit" value="Actualizar empleado" onClick={(e) => handleSubmit(e)} />
        </form>
      </div>
    </div>
  )
}

export default Edit;