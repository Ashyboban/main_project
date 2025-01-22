import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignupPage from './pages/SignUp';
import Signin from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/signin" element={<Signin />} /> {/* Render the component using JSX */}
        {/* Render the component using JSX */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
