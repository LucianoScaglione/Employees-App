import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpleados, eliminarEmpleado } from "../../redux/actions";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Home = () => {
  const dispatch = useDispatch();
  const empleados = useSelector(state => state.empleados);

  const handleDelete = (id) => {
    swal({
      title: "¿Quieres eliminar al empleado?",
      text: "Se eliminará de la base de datos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarEmpleado(id));
          swal("Empleado eliminado correctamente", {
            icon: "success"
          });
        } else {
          swal("Cancelaste la eliminación");
        };
      });
  }
  useEffect(() => {
    !empleados.length && dispatch(obtenerEmpleados())
  }, [empleados]);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <a className="btn btn-primary" href='/empleados/registrar' role="button">Agregar registro</a>
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
                  empleados.sort((a, b) => a.id - b.id).map(empleado => (
                    <tr key={empleado.id}>
                      <td>{empleado.id}</td>
                      <td>{empleado.primerNombre} {empleado.segundoNombre && empleado.segundoNombre} {empleado.primerApellido}</td>
                      <td><img width="100" height="70" src={empleado.foto} className="rounded" alt='' /></td>
                      <td>""</td>
                      <td>{empleado.Position.puesto}</td>
                      <td>{empleado.edad}</td>
                      <td>{empleado.fechaIngreso}</td>
                      <td>
                        <Link to={`/empleado/${empleado.id}`}>
                          <button className="btn btn-info">Editar</button>
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