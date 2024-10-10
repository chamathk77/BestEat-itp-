import React,{useState, useEffect} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateItem(){

  const [item,setItem]= useState({
    name:"",
    category:"",
    unit_price:null,
    quantity:null,
    rquantity:null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()
  const location = useLocation()

  const itemId = location.pathname.split("/")[3];


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/items/${itemId}`);
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItem();
  }, [itemId]);


  const handleChange = (e) => {
    setItem((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault();

    if (parseInt(item.rquantity) > parseInt(item.quantity)) {
      setErrorMessage("Remaining quantity cannot exceed the total quantity.");
      return; 
    }

    try{
      await axios.put(`http://localhost:8800/items/${itemId}`,item)
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
          <button class="nav-button" onClick={() => navigate("/admin/addinventory")}>
            Update Items
          </button>
        </div>
      </nav>
      <div className="center-container">
      <div className="add-item">
      <h1 className="title">Update Item</h1>
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

      <label className="lable">Remaining Quantity
        <div className="mb-3">
          <input className="input" type="number" placeholder="Order Quantity"  onChange={handleChange}   value={item.rquantity} name="rquantity"/>
        </div>
      </label>

      <label className="lable">Expire Date
        <div className="mb-3">
          <input className="input" type="date" placeholder="Expire date"  onChange={handleChange}  value={item.expire_date} name="expire_date"/></div>
      </label>

            {/* error message if validation fails */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button className="add" onClick={handleClick}>Update</button>
      </form>
      </div>
      </div>
    </div>
   );
}
 

export default UpdateItem;