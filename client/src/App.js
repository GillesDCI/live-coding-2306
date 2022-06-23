import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';

import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Partials/Header';


function App() {
  return (
    <AuthProvider>
  <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>
  </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
