import NavBar from "./NavBar";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import ProductCategories from "./ProductCategories";
const Home = () => {
    return (
        <div className="home">
            <NavBar></NavBar>
            <Hero></Hero>
            <FeaturedProducts></FeaturedProducts>
            <ProductCategories></ProductCategories>
        </div>
    );
}

export default Home;