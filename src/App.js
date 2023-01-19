import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Orders from './components/Orders';
import Home from './components/Home';
import Restaurant from './components/Restaurant';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>

          <Route path='/' element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="restaurent" element={<Restaurant />} />

      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
