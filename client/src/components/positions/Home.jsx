import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarPuesto, obtenerPuestos, obtenerPuestosQuery } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Pagination from "../../Pagination";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [buscarPuesto, setBuscarPuesto] = useState('');
  const dispatch = useDispatch();
  const puestos = useSelector(state => state.puestos);
  const [paginaActual, setPaginaActual] = useState(1);
  const [puestosPorPagina, setPuestosPorPagina] = useState(5);
  const indiceUltimoPuesto = paginaActual * puestosPorPagina;
  const indicePrimerPuesto = indiceUltimoPuesto - puestosPorPagina;
  const paginadoPuestos = puestos.sort((a, b) => a.id - b.id).slice(indicePrimerPuesto, indiceUltimoPuesto);
  const indiceFinalReal = Math.min(indiceUltimoPuesto, puestos.length);
  const cambiarPaginaActual = (pagina) => {
    setPaginaActual(pagina);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(obtenerPuestosQuery(buscarPuesto));
    setPaginaActual(1);
  }

  const handleDelete = (id) => {
    swal({
      title: "¿Seguro que quieres eliminar el puesto?",
      text: "Se eliminará de la base de datos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarPuesto(id));
        } else {
          swal("Cancelaste la eliminación");
        };
      });
  }

  useEffect(() => {
    if (!puestos.length) {
      dispatch(obtenerPuestos()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, puestos.length]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <a className="btn btn-primary" href="/puestos/crear" role="button">Agregar registro</a>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <p className="mb-0">Mostrar</p>
              <select className="form-select form-select-sm mx-1" onChange={e => { setPuestosPorPagina(e.target.value), setPaginaActual(1); }}>
                <option hidden>{puestosPorPagina}</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <p className="mb-0">registros</p>
            </div>
            <form className="d-flex align-items-center" onSubmit={handleSubmit} >
              <input className="form-control me-2" type="search" placeholder="Nombre de puesto" name='buscarPuesto' onChange={e => setBuscarPuesto(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </div>
          <div
            className="table-responsive-sm" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre del puesto</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  paginadoPuestos.map(puesto => (
                    <tr key={puesto.id}>
                      <td scope="row">{puesto.id}</td>
                      <td>{puesto.puesto}</td>
                      <td>
                        <Link to={`/puesto/editar/${puesto.id}`}>
                          <input className="btn btn-info" type="button" value="Editar" />
                        </Link>
                        |
                        <input className="btn btn-danger" type="button" value="Eliminar" onClick={() => handleDelete(puesto.id)} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {
              puestos.length > 0 &&
              <div className="d-flex justify-content-between align-items-center">
                <p>Mostrando {indicePrimerPuesto + 1} a {indiceFinalReal} de {puestos.length} registros</p>
                <Pagination
                  contenidoEstado={puestos.length}
                  mostrarCantidadPorPagina={puestosPorPagina}
                  paginaActual={paginaActual}
                  cambiarPaginaActual={cambiarPaginaActual} />
              </div>
            }
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}

export default Home;