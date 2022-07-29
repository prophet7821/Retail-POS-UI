
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/items' element={<Items/>}/>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
