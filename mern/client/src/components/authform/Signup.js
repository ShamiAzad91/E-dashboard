import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("sam");
  const [email, setEmail] = useState("sam@test.com");
  const [password, setPassword] = useState("12345");

  const navigate = useNavigate();

  useEffect(()=>{
const auth = localStorage.getItem("user");
if(auth){
  navigate("/");
}
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password)
    let result = await fetch(`http://localhost:8000/api/signup`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log("jee", result);
    //  console.log(`19`,result.user);
    if (result.error) {
      alert(result.error);
      return;
    } else {
      alert(`Hello ${result.user.name},you Registerd successfully`);
      navigate("/");
      localStorage.setItem('user',JSON.stringify(result.user));
      localStorage.setItem('token',JSON.stringify(result.auth));

      return;
    }
  };

  return (
    <div className="container signup">
      <div className="row justify-content-evenly">
        <div className="col">
          <h1>Signup Here</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enter a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="enter a email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3">
              Sign up
            </button>
          <h6>Already have an Account?<Link to="/login">Login here</Link></h6>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
