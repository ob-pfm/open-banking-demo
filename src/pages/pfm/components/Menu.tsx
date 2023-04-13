import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import IconA from '../../../assets/accounts-icon.png';
import IconAb from '../../../assets/accounts-selected-icon.png';
import IconB from '../../../assets/budgets-icon.png';
import IconBb from '../../../assets/budgets-selected-icon.png';
import IconC from '../../../assets/category-icon.png';
import IconCb from '../../../assets/category-selected-icon.png';
import IconD from '../../../assets/movements-icon.png';
import IconDb from '../../../assets/movements-selected-icon.png';
import IconE from '../../../assets/summary-icon.png';
import IconEb from '../../../assets/summary-selected-icon.png';

const Menu = ({ userId }: { userId: number | null }) => {
  const location = useLocation();
  return (
    <div className="menu">
      <nav className="menu__nav">
        <div className={`menu__nav-item ${location && location.pathname === '/pfm' && 'menu__nav-item--selected'}`}>
          <Link className="menu__nav-link" to="">
            Consetimento
          </Link>
        </div>
        <div
          className={`menu__nav-item ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/cuentas' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="cuentas">
            <img alt="" src={IconA} className="img-normal" />
            <img alt="" src={IconAb} className="img-active" />
            <span>Contas</span>
          </Link>
        </div>
        <div
          className={`menu__nav-item  ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/movimientos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="movimientos">
            <img alt="" src={IconD} className="img-normal" />
            <img alt="" src={IconDb} className="img-active" />
            <span> Movimentos</span>
          </Link>
        </div>
        <div
          className={`menu__nav-item ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/presupuestos' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="presupuestos">
            <img alt="" src={IconB} className="img-normal" />
            <img alt="" src={IconBb} className="img-active" />
            <span> Orçamentos</span>
          </Link>
        </div>
        <div
          className={`menu__nav-item ${
            location && location.pathname === '/pfm/categorias' && 'menu__nav-item--selected'
          } ${!userId && 'menu__nav-item--disabled'}`}
        >
          <Link className="menu__nav-link" to="categorias">
            <img alt="" src={IconC} className="img-normal" />
            <img alt="" src={IconCb} className="img-active" />
            <span>Categorias</span>
          </Link>
        </div>
        <div
          className={`menu__nav-item ${!userId && 'menu__nav-item--disabled'} ${
            location && location.pathname === '/pfm/resumen' && 'menu__nav-item--selected'
          }`}
        >
          <Link className="menu__nav-link" to="resumen">
            <img alt="" src={IconE} className="img-normal" />
            <img alt="" src={IconEb} className="img-active" />
            <span>Resumo</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default memo(Menu);
