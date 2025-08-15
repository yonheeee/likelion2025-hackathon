import './App.css';
import { Route, Routes } from 'react-router-dom';
import First from "./jsx/First.jsx";
import UserMain from "./jsx/user/main/UserMain.jsx";
function App() {
  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>
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