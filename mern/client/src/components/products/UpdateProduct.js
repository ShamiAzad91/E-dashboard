import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name,setName] = useState("");
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    // console.log(params.id);

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async()=>{
        try {
            let result = await fetch(`http://localhost:8000/product/single/${params.id}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                  }
            });
            result = await result.json();
            // console.log(result.product);
            result = result.product;
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company)
            
        } catch (err) {
            console.log(err);
            
        }
    }

   const userId = JSON.parse(localStorage.getItem("user"))._id
//    console.log('userId',userId)

    const handleUpdateProduct = async(e)=>{
        e.preventDefault()
        try {
            console.log(name,price,category,company);
           

            let result = await fetch(`http://localhost:8000/product/update/${params.id}`,{
                method:'put',
                body:JSON.stringify({name,price,category,company}),
                headers:{
                    'Content-Type':'application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

                  
                }
            });

            result = await result.json();
            console.log(result);
            if(result.status === 'success'){
               alert('successfully updated');
                navigate("/");
                return
            }else{
                alert('failed to add product')
                return;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="container product">
    <div className="row justify-content-evenly">
      <div className="col">
        <h1>Update Product Here</h1>
        <br />
        <form onSubmit={handleUpdateProduct}>
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
            Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="enter a price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter a category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter a company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

          </div>

          <button type="submit" className="btn btn-primary mb-3">
           Update Product
          </button>

        </form>
      </div>
    </div>
  </div>
  )
}

export default UpdateProduct