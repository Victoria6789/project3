import React from "react";

const Filters = ({
  availableColors,
  selectedColors,
  handleColorChange,
  minPrice,
  handleMinPriceChange,
  maxPrice,
  handleMaxPriceChange,
  filteredProductsCount
}) => {
  return (
    <div className="filters">
      <h3>Фильтр по цвету:</h3>
      {availableColors.map((color) => (
        <div key={color}>
          <input
            type="checkbox"
            checked={selectedColors.includes(color)}
            onChange={() => handleColorChange(color)}
          />
          <label>{color}</label>
        </div>
      ))}
      <h3>Фильтр по цене:</h3>
      <input
        type="number"
        placeholder="от"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <input
        type="number"
        placeholder="до"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
      <p>Найдено продуктов: {filteredProductsCount}</p>
    </div>
  );
};

export default Filters;