import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarUsuario, obtenerUsuarios } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios);
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
    !usuarios.length && dispatch(obtenerUsuarios())
  }, [dispatch]);
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
                  usuarios.map(usuario => (
                    <tr key={usuario.id}>
                      <td scope="row">{usuario.id}</td>
                      <td>{usuario.nombreUsuario}</td>
                      <td>********</td>
                      <td>{usuario.correo}</td>
                      <td>
                        <input className="btn btn-info" type="button" value="Editar" />
                        |
                        <input className="btn btn-danger" type="button" value="Eliminar" onClick={(e) => handleDelete(e, usuario.id)} />
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