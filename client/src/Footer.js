import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a leading e-commerce platform providing quality products to
              our customers. Our mission is to deliver the best online shopping
              experience.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-light" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-light" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-light" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <p>&copy; 2025 TechFlick. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
