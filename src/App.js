import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import Home from './components/Home';
// import Rsignup from './components/Rsignup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
