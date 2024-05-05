const Home = () => {
  const puestos = [
    { "id": 1, "puesto": "Programador Trainee" }, { "id": 2, "puesto": "Programador Junior" },
    { "id": 3, "puesto": "Programador Semi Senior" }, { "id": 4, "puesto": "Programador Senior" },
    { "id": 5, "puesto": "Tester Qa" }, { "id": 6, "puesto": "Líder de proyectos" }
  ];
  return (
    <div>
      <div class="card">
        <div class="card-header">
          <a className="btn btn-primary" href="/puestos/crear" role="button">Agregar registro</a>
        </div>
        <div class="card-body">
          <div
            class="table-responsive-sm" >
            <table class="table">
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
                    <tr class="">
                      <td scope="row">{p.id}</td>
                      <td>{p.puesto}</td>
                      <td>
                        <input class="btn btn-info" type="button" value="Editar" />
                        |
                        <input class="btn btn-danger" type="button" value="Eliminar" />
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