import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navi from "./components/Navi"
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'




function App() {
  return (
    <>
  
        <Routes>
          <Route path="/" element={<><Header /><Navi /></>} />
        </Routes>
    </>
  );
}

export default App;