import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import First from "./jsx/first.jsx";
import UserMain from "./jsx/user/main/UserMain.jsx";
import Header from "./jsx/Header.jsx"; 
import UserRecipt from "./jsx/user/receipt/UserRecipt.jsx";
import UserCheck from "./jsx/user/check/UserCheck.jsx"
import MyComplaint from './jsx/user/mycomplaint/MyComplaintsPage.jsx';
import UserEntireComplaintLists from "./jsx/user/UserEntireComplaintLists/UserEntireComplaintLists.jsx";
import UserDetailsPage from './jsx/user/UserDetail/UserDetail.jsx';
import MyComplaintDetail from './jsx/user/mycomplaint/MyComplaintsDetail.jsx';
import AdminComplaintSorted from './jsx/admin/AdminComplaintSorted/AdminComplaintSorted.jsx';

import Adminmain from './jsx/admin/adminmainjsx/adminmain.jsx';
import AdmindetailsPage from './jsx/admin/admindetailjsx/admindetails.jsx';
import AdminFirstPage from './jsx/admin/adminfirstjsx/AdminFirstPage.jsx';
// import EntireComplaintLists from "./jsx/common/EntireComplaintLists";
import AdminEntireComplaintLists from "./jsx/admin/AdminEntireComplaintLists/AdminEntireComplaintLists.jsx";


function App() {
  const location = useLocation();
  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>

      {location.pathname !== '/' && <Header />}

      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<First />} /> {/* 맨 처음 */}
            <Route path="/user" element={<UserMain />} /> {/* 사용자 메인 */}
            <Route path="/userrecipt" element={<UserRecipt />} /> {/* 민원 접수 */}
            <Route path="/usercheck" element={<UserCheck />} /> {/* 민원 조회 */}
            <Route path="/mycomplaint" element={<MyComplaint />} /> {/* 나의 민원 */}
            <Route path="/mycomplaint/detail" element={<MyComplaintDetail />} /> {/* 나의 민원 상세조회 */}
            <Route path="/user/entire" element={<UserEntireComplaintLists />} /> {/* 사용자 전체 민원 조회 */}
            <Route path="/user/detail/:id" element={<UserDetailsPage />} /> {/* 사용자 상세보기 */}


            <Route path="/admin" element={<AdminFirstPage/>} /> {/* 관리자 처음 */}
            <Route path="/admin/main" element={<Adminmain />} /> {/* 관리자 메인 */}
            <Route path="/admin/detail/:id" element={<AdmindetailsPage />} /> {/* 관리자 상세보기 */}
            <Route path="/admin/entire" element={<AdminEntireComplaintLists/>}/> {/* 관리자 전체 민원 조회 */}
            <Route path="/admin/sorted" element={<AdminComplaintSorted/>}/> {/* 관리자 우선순위별 민원 조회 */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;