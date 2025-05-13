import { useParams, Link } from 'react-router-dom';
import useFetch from './useFetch'; // Assuming useFetch is located here

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL

  // Use the custom hook to fetch products based on the category
  const { data: products, loading, error } = useFetch(
    `http://localhost:8000/${category}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
      <div className="category-page__products-list">
        {products.map((product) => (
          <div className="category-page__product-card" key={product.id}>
            <Link to={`/product/${category}/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className="card">
                <img src={'/' + product.image} alt={product.name} />
                <div className="product-details">
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
