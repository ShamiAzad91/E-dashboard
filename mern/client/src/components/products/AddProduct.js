import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name,setName] = useState("M20");
    const [price,setPrice] = useState("12233");
    const [category,setCategory] = useState("mobile");
    const [company,setCompany] = useState("samsung");
    const [error,setError] = useState(false)

    const navigate = useNavigate();

   const userId = JSON.parse(localStorage.getItem("user"))._id
//    console.log('userId',userId)

    const handleAddProduct = async(e)=>{
        e.preventDefault()
        try {
            console.log(name,price,category,company);
            if(!name || !price || !category || !company){
                setError(true)

                return false
            }

            let result = await fetch(`http://localhost:8000/product/add`,{
                method:'post',
                body:JSON.stringify({name,price,category,userId,company}),
                headers:{
                    'Content-Type':'application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

                }
            });

            result = await result.json();
            // console.log(result);
            if(result.status === 'success'){
               alert('successfully added')
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
        <h1>Add Product Here</h1>
        <br />
        <form onSubmit={handleAddProduct}>
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
           { error && !name &&  <span className='text-danger'>Enter valid name</span>}

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
           { error && !price &&  <span className='text-danger'>Enter Price</span>}
          
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
           { error && !category &&  <span className='text-danger'>Enter Category</span>}

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
           { error && !company &&  <span className='text-danger'>Enter company name</span>}

          </div>

          <button type="submit" className="btn btn-primary mb-3">
           Add Product
          </button>

        </form>
      </div>
    </div>
  </div>
  )
}

export default AddProduct