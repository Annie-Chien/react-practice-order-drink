import React from 'react';
import { productsData } from './Data';
const Menu = ({ pickProduct }) => {
  return (
    <div className="list-group m-2">
      {productsData.map((product, index) => {
        return (
          <div
            key={index}
            className="list-group-item list-group-item-action mb-1"
            onClick={() => pickProduct(product)}
          >
            <h6>{product.name}</h6>
            <div className="d-flex justify-content-between">
              <p className="mb-0">{product.engName}</p>
              <p className="mb-0">${product.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
