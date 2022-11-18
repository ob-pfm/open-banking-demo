import { Route, Routes } from 'react-router-dom';

import Header from './header/Header';
import Accounts from './pages/accounts/Accounts';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Accounts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
