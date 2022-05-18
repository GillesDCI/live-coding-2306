import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';


function App() {
  return (
   
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />


    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
