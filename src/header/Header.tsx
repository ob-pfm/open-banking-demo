import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Header = () => {
  const location = useLocation();
  const key = localStorage.getItem('key');
  return (
    <div className="header">
      <nav className="header__nav">
        {!key ? (
          <div
            className={`header__nav-item ${
              location && location.pathname.includes('signup') && 'header__nav-item--selected'
            }`}
          >
            <Link className="header__nav-link" to="/signup">
              Inscrição
            </Link>
          </div>
        ) : (
          <>
            {' '}
            <div
              className={`menu__nav-item--disabled header__nav-item ${
                location &&
                (location.pathname === '/meus-produtos' || location.pathname === '/') &&
                'header__nav-item--selected'
              }`}
            >
              <Link className="header__nav-link" to="/meus-produtos">
                Meus produtos
              </Link>
            </div>
            <div
              className={`menu__nav-item--disabled header__nav-item ${
                location && location.pathname === '/contas' && 'header__nav-item--selected'
              }`}
            >
              <Link className="header__nav-link" to="/contas">
                Contas
              </Link>
            </div>
            <div
              className={`menu__nav-item--disabled header__nav-item ${
                location && location.pathname === '/cartoes' && 'header__nav-item--selected'
              }`}
            >
              <Link className="header__nav-link" to="/cartoes">
                Cartões
              </Link>
            </div>
            <div
              className={`menu__nav-item--disabled header__nav-item ${
                location && location.pathname === '/meus-emprestimos' && 'header__nav-item--selected'
              }`}
            >
              <Link className="header__nav-link" to="/meus-emprestimos">
                Meus Empréstimos
              </Link>
            </div>
            <div
              className={`menu__nav-item--disabled header__nav-item ${
                location && location.pathname === '/meus-investimentos' && 'header__nav-item--selected'
              }`}
            >
              <Link className="header__nav-link" to="/meus-investimentos">
                Meus investimentos
              </Link>
            </div>
            <div
              className={`header__nav-item ${
                location && location.pathname.includes('pfm') && 'header__nav-item--selected'
              } ${!key && 'menu__nav-item--disabled'}`}
            >
              <Link className="header__nav-link" to="/pfm">
                PFM
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};
export default Header;
