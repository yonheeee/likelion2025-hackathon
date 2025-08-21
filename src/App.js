import './App.css';
<<<<<<< HEAD
import { Route, Routes, useLocation } from 'react-router-dom';
import First from "./jsx/First.jsx";
import UserMain from "./jsx/user/main/UserMain.jsx";
import Header from "./jsx/Header.jsx"; 
import UserRecipt from "./jsx/user/receipt/UserRecipt.jsx";
import UserCheck from "./jsx/user/check/UserCheck.jsx"
import MyComplaint from './jsx/user/mycomplaint/MyComplaintsPage.jsx';
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Adminmain from './pages/adminmain';

>>>>>>> a1eab37 (.)
function App() {
  const location = useLocation();
  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>
<<<<<<< HEAD
    
      {location.pathname !== '/' && <Header />}

      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<First />} />
            <Route path="/user" element={<UserMain />} />
            <Route path="/userrecipt" element={<UserRecipt />} />
            <Route path="/usercheck" element={<UserCheck />} />
            <Route path="/mycomplaint" element={<MyComplaint />} />
          </Routes>
=======
      <div className="container">
        <div className="content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Adminmain />} />
            </Routes>
          </BrowserRouter>
>>>>>>> a1eab37 (.)
        </div>
      </div>
    </div>
  );
}

export default App;