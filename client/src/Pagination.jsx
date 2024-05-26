const Pagination = ({ contenidoEstado, mostrarCantidadPorPagina, paginaActual, cambiarPaginaActual }) => {
  const numerosPaginas = [];
  for (let i = 1; i <= Math.ceil(contenidoEstado / mostrarCantidadPorPagina); i++) {
    numerosPaginas.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item ">
          <button className="page-link" disabled={paginaActual === 1} onClick={() => cambiarPaginaActual(paginaActual - 1)}>Anterior</button>
        </li>
        {
          numerosPaginas.length && numerosPaginas.map(numero =>
          (
            <li key={numero} className={`page-item ${paginaActual === numero ? 'active' : ''}`}>
              <a className="page-link" onClick={() => cambiarPaginaActual(numero)}>{numero}</a>
            </li>
          ))
        }
        <li className="page-item">
          <button className="page-link" disabled={paginaActual === numerosPaginas.length} onClick={() => cambiarPaginaActual(paginaActual + 1)}>Siguiente</button></li>
      </ul>
    </nav>
  )
}

export default Pagination;