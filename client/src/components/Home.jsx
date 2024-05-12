const Home = () => {
  const usuario = localStorage.getItem("usuarioToken");
  const usuarioParse = JSON.parse(usuario)
  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Bienvenid@ al sistema</h1>
        <p className="col-md-8 fs-4">Usuario: {usuarioParse.usuario.nombreUsuario}</p>
        <p className="col-md-8 fs-4">Correo electrónico: {usuarioParse.usuario.correo}</p>
      </div>
    </div>
  )
}

export default Home;