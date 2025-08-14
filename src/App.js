import './App.css';
import { Route, Routes } from 'react-router-dom';
import First from "./jsx/First.jsx"
function App() {
  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<First />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;