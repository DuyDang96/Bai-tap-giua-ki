import React, { useState } from 'react';

function AppNavbar({ currentTab, onSelectTab }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(true);

  const isExtensionActive = ['fines', 'stats', 'queue', 'account'].includes(currentTab);

  const handleTabClick = (tab) => {
    onSelectTab(tab);
    setDropdownOpen(false);
    setNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a 
          className="navbar-brand fw-bold" 
          href="#index"
          onClick={(e) => { e.preventDefault(); handleTabClick('equipment'); }}
        >
          Rikkei Lab
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setNavCollapsed(!navCollapsed)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${navCollapsed ? '' : 'show'}`} id="mainMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-start ${currentTab === 'equipment' ? 'active' : ''}`}
                onClick={() => handleTabClick('equipment')}
              >
                Thiết bị
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-start ${currentTab === 'borrows' ? 'active' : ''}`}
                onClick={() => handleTabClick('borrows')}
              >
                Phiếu mượn
              </button>
            </li>
            <li className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}>
              <button 
                className={`nav-link dropdown-toggle btn btn-link text-start ${isExtensionActive ? 'active' : ''}`} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                Mở rộng (Phần 2)
              </button>
              <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <li>
                  <button 
                    className={`dropdown-item ${currentTab === 'fines' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('fines')}
                  >
                    A. Quá hạn và tiền phạt
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${currentTab === 'stats' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('stats')}
                  >
                    B. Thống kê và báo cáo
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${currentTab === 'queue' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('queue')}
                  >
                    C. Đặt trước và hàng chờ
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${currentTab === 'account' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('account')}
                  >
                    D. Tài khoản và phân quyền
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
