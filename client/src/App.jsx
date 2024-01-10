import { useState } from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/join' Component={Join}></Route>
      <Route path='/chat' Component={Chat}></Route>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
