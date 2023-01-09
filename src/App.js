import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import Rsignup from './components/Rsignup';
// import Rsignup from './components/Rsignup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="registerrestaurant" element={<Rsignup />} />
          {/* <Route path="rsignup" element={<Rsignup />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
