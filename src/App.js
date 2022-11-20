import logo from './logo.svg';
import './App.css';
import Navbar from './components/headers';
import Main from './components/Main';
import { Route, Routes } from 'react-router';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Studio from './components/Studio';
import Cart from './components/Cart';

function App() {
  const user = JSON.parse(localStorage.getItem("intel-user")) || [];
 
 
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/studio' element={user.length !== 0 ? <Studio /> : <Login />}></Route>
        <Route path='/cart' element={user.length !== 0 ? <Cart /> : <Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
