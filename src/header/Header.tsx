import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Header = () => {
  const location = useLocation();
  return (
    <div className="header">
      <span className="header__title">EL BANCO</span>
      <nav className="header__nav">
        <div
          className={`header__nav-item ${
            location && location.pathname === '/movimientos' && 'header__nav-item--selected'
          }`}
        >
          <Link className="header__nav-link" to="/movimientos">
            Movimientos
          </Link>
        </div>
        <div
          className={`header__nav-item ${location && location.pathname === '/cuentas' && 'header__nav-item--selected'}`}
        >
          <Link className="header__nav-link" to="/cuentas">
            Cuentas
          </Link>
        </div>
        <div
          className={`header__nav-item ${
            location && location.pathname === '/categorias' && 'header__nav-item--selected'
          }`}
        >
          <Link className="header__nav-link" to="/categorias">
            Categorías
          </Link>
        </div>
        <div
          className={`header__nav-item ${
            location && location.pathname === '/presupuestos' && 'header__nav-item--selected'
          }`}
        >
          <Link className="header__nav-link" to="/presupuestos">
            Presupuestos
          </Link>
        </div>
        <div
          className={`header__nav-item ${location && location.pathname === '/resumen' && 'header__nav-item--selected'}`}
        >
          <Link className="header__nav-link" to="/resumen">
            Resumen
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Header;
