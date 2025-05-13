import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FeaturedProducts from './FeaturedProducts';
import Hero from './Hero';
import NavBar from './NavBar';
import Home from './Home';
import Footer from "./Footer";
import CategoryPage from './CategoryPage';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar></NavBar>

        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/category/:category' element={<CategoryPage></CategoryPage>}></Route>
        </Routes>
        <Footer></Footer>

      </BrowserRouter>
    </div>
  );
}

export default App;
