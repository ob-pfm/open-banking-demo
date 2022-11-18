import { Route, Routes } from 'react-router-dom';

import Header from './header/Header';
import { AccountsPage, CardsPage, MyInvestmentsPage, MyLoansPage, MyProductsPage, PFMPage } from './pages/subpages';

import './App.css';
import AccountsComponent from './pages/accounts/Accounts';

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
            <Route index element={<AccountsComponent />} />
            <Route path="contas" element={<AccountsComponent />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
