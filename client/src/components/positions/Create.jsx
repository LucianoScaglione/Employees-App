const Create = () => {
  return (
    <div>
      <div class="card">
        <div class="card-header">Puestos</div>
        <div class="card-body">
          <form encType="multipart/form-data">
            <div class="mb-3">
              <label class="form-label">Nombre del puesto:</label>
              <input type="text" class="form-control" placeholder="Nombre del puesto" />
            </div>
            <button type="submit" class="btn btn-success">Agregar</button>
            <a class="btn btn-primary" href="/puestos" role="button" >Cancelar</a>
          </form>
        </div>
        <div class="card-footer text-muted"></div>
      </div>

    </div>
  )
}

export default Create;