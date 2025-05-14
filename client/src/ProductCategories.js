import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaGamepad, FaRegClock } from "react-icons/fa";  // Importing React Icons

const ProductCategories = () => {
  return (
    <div className="categories-container">
      <h2 className="home-title">Shop by Category</h2>
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
          <Link to="/category/smart_phones">
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
          <Link to="/category/gaming_consoles">
            <div className="category-icon">
              <FaGamepad size={50} />
            </div>
            <p className="category-name">Gaming</p>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/category/smart_watches">
            <div className="category-icon">
              <FaRegClock size={50} />
            </div>
            <p className="category-name">Smart Watches</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;