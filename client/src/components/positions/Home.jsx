import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerPuestos } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const puestos = useSelector(state => state.puestos)

  useEffect(() => {
    dispatch(obtenerPuestos());
  }, [dispatch]);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <a className="btn btn-primary" href="/puestos/crear" role="button">Agregar registro</a>
        </div>
        <div className="card-body">
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
                  puestos.map(puesto => (
                    <tr className="">
                      <td scope="row">{puesto.id}</td>
                      <td>{puesto.puesto}</td>
                      <td>
                        <input className="btn btn-info" type="button" value="Editar" />
                        |
                        <input className="btn btn-danger" type="button" value="Eliminar" />
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