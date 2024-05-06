const Home = () => {
  const usuario = localStorage.getItem("usuarioToken");
  const usuarioParse = JSON.parse(usuario)
  return (
    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Bienvenid@ al sistema</h1>
        <p class="col-md-8 fs-4">Usuario: {usuarioParse.usuario.nombreUsuario}</p>
        <p class="col-md-8 fs-4">Correo electrónico: {usuarioParse.usuario.correo}</p>
      </div>
    </div>
  )
}

export default Home;