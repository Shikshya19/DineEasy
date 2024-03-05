import{BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home'; 
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
