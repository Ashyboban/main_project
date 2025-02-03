import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignupPage from './pages/SignUp';
import Signin from './pages/SignIn';
import TherapistRegistration from './pages/TherapistRegistration';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/signin" element={<Signin />} /> {/* Render the component using JSX */}
        <Route path="/therapist/register" element={<TherapistRegistration />} />

        {/* Render the component using JSX */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
