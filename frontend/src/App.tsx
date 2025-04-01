import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Signin from './components/Signin';
import Home from './components/Home';


const App = () => {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
};
export default App;
