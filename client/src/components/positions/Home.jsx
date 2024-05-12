const Home = () => {
  const puestos = [
    { "id": 1, "puesto": "Programador Trainee" }, { "id": 2, "puesto": "Programador Junior" },
    { "id": 3, "puesto": "Programador Semi Senior" }, { "id": 4, "puesto": "Programador Senior" },
    { "id": 5, "puesto": "Tester Qa" }, { "id": 6, "puesto": "Líder de proyectos" }
  ];
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
                  puestos.map(p => (
                    <tr className="">
                      <td scope="row">{p.id}</td>
                      <td>{p.puesto}</td>
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