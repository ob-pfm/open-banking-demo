import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="menu">
      <nav className="menu__nav">
        <div
          className={`menu__nav-item ${
            location &&
            (location.pathname === '/pfm' || location.pathname === '/pfm/contas') &&
            'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="contas">
            Contas
          </Link>
        </div>
        <div
          className={`menu__nav-item menu__nav-item--disabled ${
            location && location.pathname === '/movimientos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="/movimientos">
            Movimientos
          </Link>
        </div>
        <div
          className={`menu__nav-item menu__nav-item--disabled ${
            location && location.pathname === '/categorias' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="/categorias">
            Categorías
          </Link>
        </div>
        <div
          className={`menu__nav-item menu__nav-item--disabled ${
            location && location.pathname === '/presupuestos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="/presupuestos">
            Presupuestos
          </Link>
        </div>
        <div
          className={`menu__nav-item menu__nav-item--disabled ${
            location && location.pathname === '/resumen' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="/resumen">
            Resumen
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Menu;
