import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaGamepad, FaSwimmer } from "react-icons/fa";  // Importing React Icons

const ProductCategories = () => {
  return (
    <div className="categories-container">
      <h2 className="section-title">Shop by Category</h2>
      <div className="categories">
        {/* Category 1: Laptops */}
        <div className="category-card">
          <Link to="/category/laptops">
            <div className="category-icon">
              <FaLaptop size={50} />
            </div>
            <p className="category-name">Laptops</p>
          </Link>
        </div>
        
        {/* Category 2: Phones */}
        <div className="category-card">
          <Link to="/category/phones">
            <div className="category-icon">
              <FaMobileAlt size={50} />
            </div>
            <p className="category-name">Phones</p>
          </Link>
        </div>

        {/* Category 3: Accessories */}
        <div className="category-card">
          <Link to="/category/accessories">
            <div className="category-icon">
              <FaHeadphones size={50} />
            </div>
            <p className="category-name">Accessories</p>
          </Link>
        </div>

        {/* Category 4: Gaming */}
        <div className="category-card">
          <Link to="/category/gaming">
            <div className="category-icon">
              <FaGamepad size={50} />
            </div>
            <p className="category-name">Gaming</p>
          </Link>
        </div>

        {/* Category 5: Wearables */}
        <div className="category-card">
          <Link to="/category/wearables">
            <div className="category-icon">
              <FaSwimmer size={50} />  {/* You can choose another icon if you prefer */}
            </div>
            <p className="category-name">Wearables</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
