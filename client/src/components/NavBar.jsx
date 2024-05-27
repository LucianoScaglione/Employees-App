const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" href="/" aria-current="page">Sistema web<span className="visually-hidden">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/empleados">Empleados</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/puestos">Puestos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/usuarios">Usuarios</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" role="button" onClick={() => { localStorage.removeItem("usuarioToken"); window.location.reload(); }}>Cerrar sesión</a>
        </li>
      </ul>
    </nav>
  )
}


export default NavBar;

