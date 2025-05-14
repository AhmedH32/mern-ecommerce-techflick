import NavBar from "./NavBar";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import ProductCategories from "./ProductCategories";
import Footer from "./Footer";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";
const Home = () => {
    return (
        <div className="home">
            <Hero></Hero>
            <FeaturedProducts></FeaturedProducts>
            <ProductCategories></ProductCategories>
        </div>
    );
}

export default Home;