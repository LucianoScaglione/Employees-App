import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpleados, eliminarEmpleado, obtenerEmpleadosQuery, ordenar } from "../../redux/actions";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import Pagination from "../../Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const empleados = useSelector(state => state.empleados);
  const [loading, setLoading] = useState(true);
  const [empleado, setEmpleado] = useState('');
  const [filtro, setFiltro] = useState({
    numeros: 'ascendente',
    letras: 'ascendente',
  })
  const [paginaActual, setPaginaActual] = useState(1);
  const [empleadosPorPagina, setEmpleadosPorPagina] = useState(5);
  const indiceUltimoEmpleado = paginaActual * empleadosPorPagina;
  const indicePrimerEmpleado = indiceUltimoEmpleado - empleadosPorPagina;
  const paginadoEmpleados = empleados.slice(indicePrimerEmpleado, indiceUltimoEmpleado).sort((a, b) => a.id - b.id);
  const indiceFinalReal = Math.min(indiceUltimoEmpleado, empleados.length);
  const cambiarPaginaActual = (pagina) => {
    setPaginaActual(pagina);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(obtenerEmpleadosQuery(empleado));
    setPaginaActual(1)
  };

  const handleSort = (value, toChange, property) => {
    toChange === 'numeros' ? setFiltro({ ...filtro, numeros: value }) : setFiltro({ ...filtro, letras: value });
    const data = { value, toChange, property };
    dispatch(ordenar(data));
  };

  const handleChange = (e) => {
    dispatch(obtenerEmpleadosQuery(e.target.value));
    setEmpleado(e.target.value);
    setPaginaActual(1);
  };

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
  };

  useEffect(() => {
    if (!empleados.length) {
      dispatch(obtenerEmpleados()).then(() => setLoading(false))
    }
    else {
      setLoading(false);
    }
  }, [dispatch, empleados.length]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  };
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <a className="btn btn-primary" href="/empleados/registrar" role="button">Agregar registro</a>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <p className="mb-0">Mostrar</p>
              <select className="form-select form-select-sm mx-1" onChange={e => { setEmpleadosPorPagina(e.target.value), setPaginaActual(1); }}>
                <option hidden>{empleadosPorPagina}</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <p className="mb-0">registros</p>
            </div>
            <form className="d-flex align-items-center" onSubmit={handleSubmit}>
              <input className="form-control me-2" type="search" placeholder="Nombre o apellido" onChange={handleChange} />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </div>
          <div className="table.responsive-sm">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id {filtro.numeros === 'ascendente' ? <i className="bi bi-sort-numeric-up" onClick={() => { handleSort('descendente', 'numeros', 'id') }}></i> : <i className="bi bi-sort-numeric-down-alt" onClick={() => { handleSort('ascendente', 'numeros', 'id') }}></i>}</th>
                  <th scope="col">Nombre {filtro.letras === 'ascendente' ? <i className="bi bi-sort-alpha-up ms-1" onClick={() => { handleSort('descendente', 'letras', 'primerNombre') }}></i> : <i className="bi bi-sort-alpha-down-alt ms-1" onClick={() => { handleSort('ascendente', 'letras', 'primerNombre') }}></i>}</th>
                  <th scope="col">Foto</th>
                  <th scope="col">CV</th>
                  <th scope="col">Puesto</th>
                  <th scope="col">Edad {filtro.numeros === 'ascendente' ? <i className="bi bi-sort-numeric-up" onClick={() => { handleSort('descendente', 'numeros', 'edad') }}></i> : <i className="bi bi-sort-numeric-down-alt" onClick={() => { handleSort('ascendente', 'numeros', 'edad') }}></i>}</th>
                  <th scope="col">Fecha de ingreso {filtro.numeros === 'ascendente' ? <i className="bi bi-sort-numeric-up" onClick={() => { handleSort('descendente', 'numeros', 'fechaIngreso') }}></i> : <i className="bi bi-sort-numeric-down-alt" onClick={() => { handleSort('ascendente', 'numeros', 'fechaIngreso') }}></i>}</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  paginadoEmpleados.map(empleado => {
                    return (
                      <tr key={empleado.id}>
                        <td>{empleado.id}</td>
                        <td>{empleado.primerNombre} {empleado.segundoNombre && empleado.segundoNombre} {empleado.primerApellido}</td>
                        <td><img width="70" height="50" src={empleado.foto} className="rounded" alt='' /></td>
                        <td>{empleado.curriculumVitae ? <strong><a className="text-decoration-none" href={empleado.curriculumVitae} target="_blank">{empleado.primerNombre}{empleado.primerApellido}.pdf</a></strong> : <p className="text-secondary">Sin C.V</p>}</td>
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
                    )
                  })
                }
              </tbody>
            </table>
            {
              empleados.length > 0 &&
              <div className="d-flex justify-content-between align-items-center">
                <p>Mostrando {indicePrimerEmpleado + 1} a {indiceFinalReal} de {empleados.length} registros</p>
                <Pagination
                  contenidoEstado={empleados.length}
                  mostrarCantidadPorPagina={empleadosPorPagina}
                  paginaActual={paginaActual}
                  cambiarPaginaActual={cambiarPaginaActual} />
              </div>
            }
          </div>
        </div>
      </div>
      <br />
    </div >
  )
}

export default Home;