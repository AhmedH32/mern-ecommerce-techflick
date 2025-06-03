import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FeaturedProducts from './FeaturedProducts';
import SearchResultsPage from './SearchResultsPage';
import Hero from './Hero';
import NavBar from './NavBar';
import Home from './Home';
import Footer from "./Footer";
import CategoryPage from './CategoryPage';
import ProductDetails from './ProductDetails';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CartPage from './CartPage';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>

          <BrowserRouter>
            <NavBar></NavBar>

            <Routes>
              <Route path='/' element={<Home></Home>} />
              <Route path='/category/:category' element={<CategoryPage></CategoryPage>}></Route>
              <Route path="/product/:category/:id" element={<ProductDetails />} />
              <Route path='/signin' element={<SignIn></SignIn>} />
              <Route path='/signup' element={<SignUp></SignUp>} />
              <Route path='cart' element={<CartPage></CartPage>}></Route>
              <Route path="/search" element={<SearchResultsPage />} />

            </Routes>
            <Footer></Footer>

          </BrowserRouter>

        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
