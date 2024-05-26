import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { crearPuestos } from '../../redux/actions';

const Create = () => {
  const [puesto, setPuesto] = useState({ puesto: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(crearPuestos(puesto));
    setPuesto({ puesto: '' });
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">Puestos</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del puesto:</label>
              <input type="text" className="form-control" placeholder="Nombre del puesto" value={puesto.puesto} onChange={(e) => setPuesto({ puesto: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-success">Agregar</button>
            <a className="btn btn-primary" href="/puestos" role="button">Cancelar</a>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
      <br />
    </div>
  )
}

export default Create;