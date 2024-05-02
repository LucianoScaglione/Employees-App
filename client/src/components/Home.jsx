import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpleados, eliminarEmpleado } from "../redux/actions";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const empleados = useSelector(state => state.empleados);

  const handleDelete = (id) => {
    dispatch(eliminarEmpleado(id));
  }

  useEffect(() => {
    !empleados.length && dispatch(obtenerEmpleados())
  }, [empleados]);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <Link to='/empleados/registrar'>
            <a className="btn btn-primary" role="button">Agregar registro</a>
          </Link>
        </div>
        <div className="card-body">
          <div className="table.responsive-sm">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Foto</th>
                  <th scope="col">CV</th>
                  <th scope="col">Puesto</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Fecha de ingreso</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  empleados.map(empleado => (
                    <tr key={empleado.id}>
                      <td>{empleado.id}</td>
                      <td>{empleado.primerNombre} {empleado.segundoNombre && empleado.segundoNombre} {empleado.primerApellido}</td>
                      <td>""</td>
                      <td>""</td>
                      <td>{empleado.puesto}</td>
                      <td>{empleado.edad}</td>
                      <td>{empleado.fechaIngreso}</td>
                      <td>
                        <Link to={`/empleado/${empleado.id}`}>
                          <a className="btn btn-info" role="butgon">Editar</a>
                        </Link>
                        |<a className="btn btn-danger" role="button" onClick={() => handleDelete(empleado.id)}>Eliminar</a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;