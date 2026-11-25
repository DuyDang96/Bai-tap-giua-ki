import React, { useState } from 'react';
import AppNavbar from './components/AppNavbar';
import EquipmentPage from './pages/EquipmentPage';
import BorrowPage from './pages/BorrowPage';
import FinesPage from './pages/FinesPage';
import StatsPage from './pages/StatsPage';
import QueuePage from './pages/QueuePage';
import AccountPage from './pages/AccountPage';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('equipment');

  const renderContent = () => {
    switch (currentTab) {
      case 'equipment':
        return <EquipmentPage />;
      case 'borrows':
        return <BorrowPage />;
      case 'fines':
        return <FinesPage />;
      case 'stats':
        return <StatsPage />;
      case 'queue':
        return <QueuePage />;
      case 'account':
        return <AccountPage onSelectTab={setCurrentTab} />;
      default:
        return <EquipmentPage />;
    }
  };

  return (
    <div className="App min-vh-100 bg-light d-flex flex-column">
      {/* Navbar chung */}
      <AppNavbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Nội dung trang theo tab */}
      <div className="flex-grow-1">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-white border-top py-3 mt-auto">
        <div className="container text-center text-muted small">
          © 2026 Rikkei Lab - Hệ thống Quản lý Thiết bị & Phiếu mượn
        </div>
      </footer>
    </div>
  );
}

export default App;
