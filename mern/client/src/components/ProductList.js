import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:8000/product/all",{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      // console.log(result.product,'jj')
      setProducts(result.product);
      // console.log(products);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async(id)=>{
    try {
      // console.log(id)
      let ans = window.confirm('are you sure want to delete?');
      console.log(ans,'hhhhhh');
      if(!ans){
        return false
      }

      let result = await fetch(`http://localhost:8000/product/remove/${id}`,{
        method:'Delete',
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
        }
      }) ;

      result = await result.json();
      if(result)
      {
        alert(`Sucessfully deleted`);
        getProducts();
      }else{
        alert('failed to delete record');
        return
      }
      
    } catch (err) {
console.log(err);      
    }
  }

  return (
    <div className="container">
      <h1>All Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Company</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>{item.company}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>deleteProduct(item._id)}>Delete</button> 
                <Link to={`/product/update/${item._id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
