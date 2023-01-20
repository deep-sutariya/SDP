import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Orders from './components/Orders';
import Home from './components/Home';
import RestaurantMenu from './components/RestaurantMenu';
import RestaurantHome from './components/RestaurantHome';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>

          <Route path='/' element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="restaurentmenu" element={<RestaurantMenu />} />
          <Route path="restaurenthome" element={<RestaurantHome />} />

      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
