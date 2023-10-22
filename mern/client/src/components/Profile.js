import React, { useEffect } from 'react';
import Logo from "../img/logo.png";

const Profile = () => {
const auth = JSON.parse(localStorage.getItem("user"));
console.log('hiprofile',auth);
  return (
    <div className="container d-flex align-item-center justify-content-center mt-2">
        <div className="card" style={{width: '18rem'}}>
  <img src={Logo} className="card-img-top" alt="logo" height={'230px'} />
  <div className="card-body">
    <h5 className="card-title">{auth.name}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>

  )
}

export default Profile