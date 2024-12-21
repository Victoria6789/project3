import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import Filters from "./Filt";
import "./index.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("priceAsc");

  useEffect(() => {
    const loadedProducts = loadProducts();
    const colors = [
      ...new Set(loadedProducts.flatMap((product) => product.colors)),
    ];
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
    setAvailableColors(colors);
  }, []);

  const generateRandomString = (length) => {
    const characters = "йцукенгшщзхъфывапролджэячсмитьбю";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const randomWords = () => {
    const randomString = (length) => {
      const characters = "йцукенгшщзхъфывапролджэячсмитьбю";
      return Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join("");
    };
    return `${randomString(5)} ${randomString(5)}`;
  };

  const getRandomElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const generateRandomProduct = () => {
    const colors = ["черный", "зеленый", "бежевый", "синий", "белый"];
    const rating = (Math.random() * (5 - 3) + 3).toFixed(1);
    const price = Math.floor(Math.random() * (70 - 20 + 1)) + 20;

    return {
      name: generateRandomString(10),
      description: randomWords(),
      price,
      imageUrl: `./img/${Math.floor(Math.random() * 6) + 1}.jpg`,
      colors: [getRandomElement(colors)],
      rating,
    };
  };

  const loadProducts = () => {
    const numberOfProducts = 10;
    return Array.from({ length: numberOfProducts }, generateRandomProduct);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleColorChange = (color) => {
    const newSelectedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(newSelectedColors);
  };

  const handleMinPriceChange = (e) => {
    const price = e.target.value;
    setMinPrice(price);
  };

  const handleMaxPriceChange = (e) => {
    const price = e.target.value;
    setMaxPrice(price);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const filterProducts = (products) => {
    const filters = [
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery),
      (product) =>
        selectedColors.length === 0 ||
        product.colors.some((color) => selectedColors.includes(color)),
      (product) => {
        const price = product.price;
        return (
          (!minPrice || price >= Number(minPrice)) &&
          (!maxPrice || price <= Number(maxPrice))
        );
      },
    ];

    return products.filter((product) =>
      filters.every((filter) => filter(product))
    );
  };

  const sortProducts = (products) => {
    let sortedProducts = [...products];
    if (sortOption === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popularity") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    return sortedProducts;
  };

  useEffect(() => {
    const filtered = filterProducts(products);
    const sorted = sortProducts(filtered);
    setFilteredProducts(sorted);
  }, [searchQuery, selectedColors, minPrice, maxPrice, sortOption, products]);

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Поиск продуктов..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div>
        <button
          className={sortOption === "priceAsc" ? "active" : ""}
          onClick={() => handleSortChange("priceAsc")}
        >
          Сначала дешевые
        </button>
        <button
          className={sortOption === "priceDesc" ? "active" : ""}
          onClick={() => handleSortChange("priceDesc")}
        >
          Сначала дорогие
        </button>
        <button
          className={sortOption === "popularity" ? "active" : ""}
          onClick={() => handleSortChange("popularity")}
        >
          Сначала популярные
        </button>
      </div>

      <div className="filtre">
        <Filters
          availableColors={availableColors}
          selectedColors={selectedColors}
          handleColorChange={handleColorChange}
          minPrice={minPrice}
          handleMinPriceChange={handleMinPriceChange}
          maxPrice={maxPrice}
          handleMaxPriceChange={handleMaxPriceChange}
          filteredProductsCount={filteredProducts.length}
        />

        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))
          ) : (
            <p style={{ color: "red" }}>По вашему запросу ничего не найдено.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
