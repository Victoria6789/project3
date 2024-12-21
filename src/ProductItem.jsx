import React from "react";
import "./index.css";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Цена: ${product.price.toFixed(2)}</p> {}
      <p>Цвет: {product.colors}</p>
      <p>Рейтинг: {product.rating} ⭐</p> {}
    </div>
  );
};

export default ProductItem;
