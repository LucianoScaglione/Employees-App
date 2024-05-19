import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPuesto, actualizarPuesto, vaciarEstado } from '../../redux/actions';
import { useParams, useHistory } from 'react-router-dom';

const Edit = () => {
  const [input, setInput] = useState({ puesto: '' });
  const [loading, setLoading] = useState(true);
  const puesto = useSelector(state => state.puesto);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actualizarPuesto(id, input));
    history.push('/puestos');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    !puesto.length && dispatch(obtenerPuesto(id)).then(setLoading(false));

    return () => {
      dispatch(vaciarEstado());
    }
  }, [dispatch]);

  useEffect(() => {
    if (puesto) {
      setInput({ puesto: puesto.puesto || '' });
    }
  }, [puesto])

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
    <div>
      <div className="card">
        <div className="card-header">Puestos</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del puesto:</label>
              <input type="text" className="form-control" name="puesto" placeholder="Nombre del puesto" value={input.puesto} onChange={(e) => setInput({ puesto: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-success">Actualizar registro</button>
            <a className="btn btn-primary" href="/puestos" role="button">Cancelar</a>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    </div>
  )
}

export default Edit;