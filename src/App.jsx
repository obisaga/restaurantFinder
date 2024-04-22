import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navi from "./components/Navi"
import Restaurants from "./components/Restaurants"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'




function App() {
  return (
    <>
  
        <Routes>
          <Route path="/" element={<><Navi /><Restaurants /></>} />
        </Routes>
    </>
  );
}

export default App;