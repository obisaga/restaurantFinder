import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navi from "./components/Navi"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'




function App() {
  return (
    <>
  
        <Routes>
          <Route path="/resFinder" element={<Navi />} />
        </Routes>
    </>
  );
}

export default App;