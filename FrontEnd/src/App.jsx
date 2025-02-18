import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/auth/Login';
import SignUp from './screens/auth/Signup';
import AdminHomeScreen from './screens/AdminHomeScreen/AdminHomeScreen';
import PaymentReceiptScreen from './screens/PaymentReceiptScreen';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className='container-fluid bg-secondary' style={{height: '1rem'}} />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/logout' element={<Login logout={true}/>} />
        <Route path="/manage" element={<AdminHomeScreen />}/>
        <Route path="/receipt" element={<PaymentReceiptScreen />} />
      </Routes>
      <div className='container-fluid bg-secondary' style={{height: '1rem'}} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
