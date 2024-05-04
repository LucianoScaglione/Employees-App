const Home = () => {
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
                <tr class="">
                  <td scope="row">1</td>
                  <td>Programador Junior</td>
                  <td>
                    <input class="btn btn-info" type="button" value="Editar" />
                    |
                    <input class="btn btn-danger" type="button" value="Eliminar" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home;