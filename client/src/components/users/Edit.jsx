import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editarUsuario, obtenerUsuario } from '../../redux/actions';

const Edit = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    nombreUsuario: '',
    contraseña: '',
    correo: ''
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario);
  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarUsuario(id, state));
    history.push('/usuarios');
    setState({
      nombreUsuario: '',
      contraseña: '',
      correo: ''
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    dispatch(obtenerUsuario(id)).then(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setState({
      nombreUsuario: usuario.nombreUsuario || '',
      contraseña: '',
      correo: usuario.correo || ''
    })
  }, [usuario]);
  if (loading) {
    return (
      <div className="text-center m-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <div className="card">
      <div className="card-header">Datos del usuario</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" name="nombreUsuario" value={state.nombreUsuario} placeholder="Nombre de usuario" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="contraseña" placeholder="Editar contraseña" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="text" className="form-control" name="correo" value={state.correo} placeholder="Correo electrónico" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Actualizar registro</button>
          <a className="btn btn-primary" href="/usuarios" role="button">Cancelar</a>
        </form>
      </div>
      <div className="card-footer text-muted">
      </div>
    </div >
  )
}

export default Edit;