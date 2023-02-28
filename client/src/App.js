import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
