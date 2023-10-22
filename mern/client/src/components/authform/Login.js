import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
const [email,setEmail] = useState("sam@test.com");
const [password,setPassword] = useState("12345");
const navigate = useNavigate();
useEffect(()=>{
const auth = localStorage.getItem("user");
if(auth){
    navigate("/")
}
},[])

const handleLogin = async(e)=>{
    e.preventDefault()
    try {
        console.warn(email,password)
        let result = await fetch(`http://localhost:8000/api/login`,{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        console.log('hii17',result);
        console.log('hii17',result.user);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));

            navigate("/");
        }else{
            alert(`failed to login`)
            return;
        }



    } catch (err) {
        console.log(err)
        
    }
}

  return (

    <div className="container signup">
    <div className="row justify-content-evenly">
      <div className="col">
        <h1>Login Here</h1>
        <br />
        <form onSubmit={handleLogin}>
        
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
            Login
          </button>
          <h6>Dont have an Account?<Link to="/signup">signup here</Link></h6>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login