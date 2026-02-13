import { useContext } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const NavBar = () => {
  const { getTotalCartAmount } = useContext(StoreContext); 
  const location = useLocation();
  const activeHash = location.hash;

  return (
    <div className="navbar">
      <Link to="/" aria-label="EcoFood home">
        <img src={assets.logo} alt="EcoFood" className="logo" />
      </Link>
      <ul className="navbar-menu" aria-label="Primary navigation">
        <li>
          <NavLink to="/" end>
            {({ isActive }) => <span className={isActive ? "active" : ""}>Home</span>}
          </NavLink>
        </li>
        <li>
          <a
            href="#explore-menu"
            className={activeHash === "#explore-menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#footer"
            className={activeHash === "#footer" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart" aria-label="Open cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div aria-hidden="true" className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
