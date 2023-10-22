import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Signup from "./components/authform/Signup";
import PrivateComponents from "./components/PrivateComponents";
import Login from "./components/authform/Login";
import AddProduct from "./components/products/AddProduct";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/products/UpdateProduct";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComponents />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/product/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>user logout page</h1>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
