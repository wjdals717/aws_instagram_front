import { Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './components/Layouts/RootLayout/RootLayout';
import Sidebar from './components/Sidebar/Sidebar';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import AuthRoute from './auth/AuthRoute';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path='/' element={<AuthRoute element={<Home />}/>}/>
        <Route path='/accounts/emailsignup' element={<AuthRoute element={<Signup />} />} />
        <Route path='/accounts/login' element={<AuthRoute element={<Signin />} />} />
        <Route path='/:username' element={<AuthRoute element={<Profile />} />}/>
        <Route path='/explore' element={<div>test3</div>}/>
      </Routes>
    </RootLayout>
  );
}

export default App;
