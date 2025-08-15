import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import First from "./jsx/First.jsx";
import UserMain from "./jsx/user/main/UserMain.jsx";
import Header from "./jsx/Header.jsx"; 

function App() {
  const location = useLocation();
  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>
   
      {location.pathname !== '/' && <Header />}

      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<First />} />
            <Route path="/user" element={<UserMain />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;