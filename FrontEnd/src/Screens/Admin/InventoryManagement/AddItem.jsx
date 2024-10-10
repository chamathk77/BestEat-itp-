import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem(){

  const [item,setItem]= useState({
    name:"",
    category:"",
    unit_price:null,
    quantity:null,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setItem((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/items",item)
      navigate("/admin/displayinventory")}
      catch(err){
        console.log(err)
      }
    }
  

  console.log(item)
   return(
    <div >
      <nav class="navbar">
        <div class="nav-container">
          <button class="nav-button" onClick={() => navigate("/admin/displayinventory")}>
            Display Items
          </button>
          <button class="nav-button" onClick={() => navigate("/admin/update/:id")}>
            Update Items
          </button>
        </div>
      </nav>
      <div className="center-container">
      <div className="add-item">
      <h1 className="title">Add New Item</h1>
      <form >
      <label className="lable">Item Name
        <div className="mb-3">
          <input className="input" type="text" placeholder="name"  onChange={handleChange} value={item.name} name="name"/>
        </div>
      </label>

      <label className="lable">Category
        <div className="mb-3">
          <select name="category" className="input" placeholder="Category" value={item.category} onChange={handleChange}>
            <option value="Blank">Select</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Spices">Spices</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
      </label>

      <label className="lable">Unit Price
        <div className="mb-3">
          <input className="input" type="number" placeholder="Unit Price"  onChange={handleChange} value={item.unit_price} name="unit_price"/></div>
      </label>

      <label className="lable">Maximum Quantity
        <div className="mb-3">
          <input className="input" type="number" placeholder="Max Quantity"  onChange={handleChange}  value={item.quantity} name="quantity"/></div>
      </label>

      <label className="lable">Expire Date
        <div className="mb-3">
          <input className="input" type="date" placeholder="Expire date"  onChange={handleChange}  value={item.expire_date} name="expire_date"/></div>
      </label>
      

      <button className="add" onClick={handleClick}>Add</button>
      </form>
      </div>
      </div>
    </div>
   );
}
 

export default AddItem