import React, { useEffect, useState } from "react"
import {} from './DataRender.css';

const Data = () => {
  const [items, setItem] = useState([])
  useEffect(() => {
    const api = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';
    fetch(api).then((response) => response.json()).then((data) => setItem(data));

  },[])
  return(
    <>
      <div className="container">
        { items.map((item) =>{
          return(
            <div className="card" key={item.id}> 
              <img src={item.imageURL} alt='' />
              <h4> Name : {item.name}</h4>
              <h4>price : {item.price}</h4>
              <h4>Gender :{item.gender}</h4>
              <h4>Type : {item.type}</h4>
              <h4>Quantity : {item.quantity}</h4>
              <div>
                <button className="add_button">Add to Cart</button>
              </div>
            </div>
            
          )

        })}
      </div>

    </>
      
  );
}
export default Data;