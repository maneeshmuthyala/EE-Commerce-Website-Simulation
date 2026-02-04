import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          DashBoard
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/orders" className="nav-link">
          Orders
        </Link>

        <Link to="/vendor" className="nav-link">
          Vendor
        </Link>

        <Link to="/cart" className="cart-btn">
          Cart
        </Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
