import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FeaturedProducts from './FeaturedProducts';
import Hero from './Hero';
import NavBar from './NavBar';
import Home from './Home';
function App() {
   return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>} />
           </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
