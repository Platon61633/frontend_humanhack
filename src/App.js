// import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login';
import Main from './main/stuff';
import Contact from './main/contact';
// import Login from './auth';

function App() {


  // const navigator = useNavigate()

  // useEffect(
  //   ()=>{
  //     console.log(Cookies.get());
  //   }, []
  // )
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Login/>}
                    />
                    <Route
                      exact
                      path='/main'
                      element={<Main/>}
                    />
                    <Route
                      exact
                      path='/contact'
                      element={<Contact/>}
                    />
                </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
