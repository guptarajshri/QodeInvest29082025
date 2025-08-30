import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo_CMPremium.png';
import { useState } from 'react';

export default function Sidebar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* <div className="mobile-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">menu</span>
      </div> */}
      <aside className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        <div className="brand">
          <img src={Logo} alt="Capitalmind Premium" style={{ height: 32 }} />
        </div>
        <nav className="nav">
          <NavLink to="/" end onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">home</span>
            Home
          </NavLink>
          <NavLink to="/portfolio" onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">business_center</span>
            Portfolios
          </NavLink>
          <NavLink to="/experimental" onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">experiment</span>
            Experimentals
          </NavLink>
          <NavLink to="/slackarchives" onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">inventory_2</span>
            Slack Archives
          </NavLink>
          <NavLink to="/referfriend" onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">person_add</span>
            Refer a friend
          </NavLink>
          <NavLink to="/giftsubscription" onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">featured_seasonal_and_gifts</span>
            Gift a subscription
          </NavLink>
          <NavLink to="/account" onClick={toggleSidebar}>
            <span className="material-symbols-outlined nav-icon">person</span>
            Account
          </NavLink>
        </nav>
        <div className="user-info-container">
          <div className="user-profile-trigger" onClick={togglePopup}>
            <div className="user-initials-circle">RN</div>
            <span className="material-symbols-outlined dropdown-arrow">keyboard_arrow_down</span>
          </div>
          <div className="subscription-info">
            <div className="subscription-validity">CMP1Y</div>
            <div className="subscription-validity">Valid till Apr 19, 2025</div>
          </div>
        </div>
      </aside>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
