import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = ()=>{
    // console.warn("apple")
    localStorage.clear();
    navigate("/signup")
    
  }

  return (
    <div className="container-fluid bg-warning">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width={40} height={32}>
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">E-comm</span>
        </Link>
      {auth?  <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add Products
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" onClick={logout} className="nav-link">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          
        </ul> :
        <ul  className="nav nav-pills">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </li>
        </ul>
        
      }
       
      </header>
    </div>
  );
};

export default NavBar;
