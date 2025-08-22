import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import First from "./jsx/First.jsx";
import UserMain from "./jsx/user/main/UserMain.jsx";
import Header from "./jsx/Header.jsx"; 
import UserRecipt from "./jsx/user/receipt/UserRecipt.jsx";
import UserCheck from "./jsx/user/check/UserCheck.jsx"
import MyComplaint from './jsx/user/mycomplaint/MyComplaintsPage.jsx';
import Adminmain from './jsx/admin/adminmainjsx/adminmain.jsx';
import AdmindetailsPage from './jsx/admin/admindetailjsx/admindetails.jsx';
import AdminFirstPage from './jsx/admin/adminfirstjsx/AdminFirstPage.jsx';


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
            <Route path="/userrecipt" element={<UserRecipt />} />
            <Route path="/usercheck" element={<UserCheck />} />
            <Route path="/mycomplaint" element={<MyComplaint />} />
            <Route path="/admin" element={<AdminFirstPage/>} />
            <Route path="/admin/main" element={<Adminmain />} />
            <Route path="/admin/details" element={<AdmindetailsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;