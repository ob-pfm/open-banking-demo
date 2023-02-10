import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

const Menu = ({ userId }: { userId: number | null }) => {
  const location = useLocation();
  return (
    <div className="menu">
      <nav className="menu__nav">
        <div className={`menu__nav-item ${location && location.pathname === '/pfm' && 'menu__nav-item--selected'}`}>
          <Link className="menu__nav-link" to="">
            Consentimento
          </Link>
        </div>
        <div
          className={`menu__nav-item menu__nav-item--disabled ${
            location && location.pathname === '/pfm/resumen' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="resumen">
            Resumo
          </Link>
        </div>
        <div
          className={`menu__nav-item ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/cuentas' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="cuentas">
            Contas
          </Link>
        </div>
        <div
          className={`menu__nav-item  ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/movimientos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="movimientos">
            Movimientos
          </Link>
        </div>
        <div
          className={`menu__nav-item ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/presupuestos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="presupuestos">
            Orçamentos
          </Link>
        </div>
        <div
          className={`menu__nav-item ${
            location && location.pathname === '/pfm/categorias' && 'menu__nav-item--selected'
          } ${!userId && 'menu__nav-item--disabled'}`}
        >
          <Link className="menu__nav-link" to="categorias">
            Categorias
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default memo(Menu);
