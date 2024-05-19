import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarUsuario, informacionUsuario, obtenerUsuarios } from "../../redux/actions";
import { Link } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios);
  const usuarioLogueado = informacionUsuario();
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
    !usuarios.length && dispatch(obtenerUsuarios()).then(setLoading(false));
  }, [dispatch]);

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
          <a className="btn btn-primary" href="/usuarios/registrar" role="button">Agregar registro</a>
        </div>
        <div className="card-body">
          <div className="table-responsive-sm" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre del usuario</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.sort((a, b) => a.id - b.id).map(usuario => (
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;