// src/SearchResultsPage.js
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from './useFetch'; // CORRECTED: Now correctly points to src/useFetch.js
import ProductCard from './ProductCard'; // Assuming ProductCard.js is directly in src/ as well

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  // Fetch products based on the search query
  const { data: products, loading, error } = useFetch(
    searchQuery ? `http://localhost:5000/api/products/search?q=${encodeURIComponent(searchQuery)}` : null
  );

  useEffect(() => {
    // You can add logic here if the searchQuery changes, e.g., for analytics
    console.log("Searching for:", searchQuery);
  }, [searchQuery]);

  if (!searchQuery) {
    return <div className="container my-5">Please enter a search query.</div>;
  }
  if (loading) return <div className="container my-5">Loading search results...</div>;
  if (error) return <div className="container my-5 text-danger">Error: {error}</div>;
  if (!products || products.length === 0) {
    return <div className="container my-5">No products found for "{searchQuery}".</div>;
  }

  return (
    <div className="container my-5">
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;