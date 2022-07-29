import { Button } from "antd";
import React from "react";

const Item = ({ item }) => {
  return (
    <div className="item">
      <h4 className = 'name'>{item.name}</h4>
      <img src={item.image} alt="" style={{ height: 100, width: 100 }} />
      <h4 className='price'>
        <b>Price:</b>
        {item.price} $/-
      </h4>
      <div className="d-flex justify-content-end">
        <Button>Add To Cart</Button>
      </div>
    </div>
  );
};

export default Item;
