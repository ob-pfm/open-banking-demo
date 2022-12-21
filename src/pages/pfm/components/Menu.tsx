import { FC, memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

const Menu: FC = () => {
  const location = useLocation();
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
          className={`menu__nav-item ${
            location && location.pathname === '/pfm/movimientos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="movimientos">
            Movimientos
          </Link>
        </div>
        <div
          className={`menu__nav-item ${
            location && location.pathname === '/pfm/categorias' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="categorias">
            Categorías
          </Link>
        </div>
        <div
          className={`menu__nav-item ${
            location && location.pathname === '/pfm/presupuestos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="presupuestos">
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
export default memo(Menu);
