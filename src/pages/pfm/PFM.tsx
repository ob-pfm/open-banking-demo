import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './style.css';

const PFMPage = () => (
  <>
    <Menu />
    <Outlet />
  </>
);

export default PFMPage;
