import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
        <div className="col-md-6">
          <ul className="list-inline text-md-right">
            <li className="list-inline-item"><Link to="#">Privacy Policy</Link></li>
            <li className="list-inline-item"><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  



  );
};

export default Footer;
