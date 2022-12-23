import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './header/Header';
import { AccountsPage, CardsPage, MyInvestmentsPage, MyLoansPage, MyProductsPage, PFMPage } from './pages/subpages';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AccountsComponent from './pages/accounts/Accounts';
import CategoriesComponent from './pages/categories/Categories';
import TransactionsComponent from './pages/transactions/Transactions';
import BudgetsComponent from './pages/budgets/Budgets';
import SumaryComponent from './pages/sumary/Sumary';


function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<MyProductsPage />} />
          <Route path="/meus-produtos" element={<MyProductsPage />} />
          <Route path="/contas" element={<AccountsPage />} />
          <Route path="/cartoes" element={<CardsPage />} />
          <Route path="/meus-emprestimos" element={<MyLoansPage />} />
          <Route path="/meus-investimentos" element={<MyInvestmentsPage />} />
          <Route path="/pfm" element={<PFMPage />}>
            <Route index element={<SumaryComponent />} />
            <Route path="resumen" element={<SumaryComponent />} />
            <Route path="movimientos" element={<TransactionsComponent />} />
            <Route path="contas" element={<AccountsComponent />} />
            <Route path="categorias" element={<CategoriesComponent />} />
            <Route path="presupuestos" element={<BudgetsComponent />} />

          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
