import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarUsuario, informacionUsuario, obtenerUsuarios, obtenerUsuariosQuery, ordenar } from "../../redux/actions";
import { Link } from 'react-router-dom';
import Pagination from "../../Pagination";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [buscarUsuario, setBuscarUsuario] = useState('');
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios);
  const usuarioLogueado = informacionUsuario();
  const [filtro, setFiltro] = useState({
    numeros: 'ascendente',
    letras: 'ascendente',
  });
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuariosPorPagina, setUsuariosPorPagina] = useState(5);
  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const paginadoUsuarios = usuarios.slice(indicePrimerUsuario, indiceUltimoUsuario);
  const indiceFinalReal = Math.min(indiceUltimoUsuario, usuarios.length)
  const cambiarPaginaActual = (pagina) => {
    setPaginaActual(pagina);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(obtenerUsuariosQuery(buscarUsuario));
    setPaginaActual(1);
  }
  const handleSort = (value, toChange, property) => {
    toChange === 'numeros' ? setFiltro({ ...filtro, numeros: value }) : setFiltro({ ...filtro, letras: value });
    const data = { value, toChange, property, ordenar: 'users' };
    dispatch(ordenar(data));
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "¿Quieres eliminar el usuario?",
      text: "Se eliminará de la base de datos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarUsuario(id));
          swal("Usuario eliminado correctamente", {
            icon: "success"
          });
        } else {
          swal("Cancelaste la eliminación");
        };
      });
  }
  useEffect(() => {
    if (!usuarios.length) {
      dispatch(obtenerUsuarios()).then(() => setLoading(false))
    }
    else {
      setLoading(false);
    }
  }, [dispatch, usuarios.length]);

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
        <div className="card-header d-flex justify-content-between align-items-center">
          <a className="btn btn-primary" href="/usuarios/registrar" role="button">Agregar registro</a>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <p className="mb-0">Mostrar</p>
              <select className="form-select form-select-sm mx-1" onChange={e => { setUsuariosPorPagina(e.target.value), setPaginaActual(1); }}>
                <option hidden>{usuariosPorPagina}</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <p className="mb-0">registros</p>
            </div>
            <form className="d-flex align-items-center" onSubmit={handleSubmit} >
              <input className="form-control me-2" type="search" placeholder="Nombre de usuario" name='buscarUsuario' onChange={e => setBuscarUsuario(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </div>
          <div className="table-responsive-sm" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id {filtro.numeros === 'ascendente' ? <i className="bi bi-sort-numeric-up" onClick={() => { handleSort('descendente', 'numeros', 'id') }}></i> : <i className="bi bi-sort-numeric-down-alt" onClick={() => { handleSort('ascendente', 'numeros', 'id') }}></i>}</th>
                  <th scope="col">Nombre del usuario {filtro.letras === 'ascendente' ? <i className="bi bi-sort-alpha-up ms-1" onClick={() => { handleSort('descendente', 'letras', 'nombreUsuario') }}></i> : <i className="bi bi-sort-alpha-down-alt ms-1" onClick={() => { handleSort('ascendente', 'letras', 'nombreUsuario') }}></i>}</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  paginadoUsuarios.map(usuario => (
                    <tr key={usuario.id}>
                      <td scope="row">{usuario.id}</td>
                      <td>{usuario.nombreUsuario}</td>
                      <td>********</td>
                      <td>{usuario.correo}</td>
                      {
                        usuarioLogueado.usuario.id === usuario.id || usuarioLogueado.usuario.id === 1 ?
                          <td>
                            <Link to={`/usuario/editar/${usuario.id}`}>
                              <input className="btn btn-info" type="button" value="Editar" />
                            </Link>
                            |
                            <input className="btn btn-danger" type="button" value="Eliminar" onClick={(e) => handleDelete(e, usuario.id)} />
                          </td> : <td></td>
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {
              usuarios.length > 0 &&
              <div className="d-flex justify-content-between align-items-center">
                <p>Mostrando {indicePrimerUsuario + 1} a {indiceFinalReal} de {usuarios.length} registros</p>
                <Pagination
                  contenidoEstado={usuarios.length}
                  mostrarCantidadPorPagina={usuariosPorPagina}
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