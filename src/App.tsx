import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FacebookLogin from "./components/FacebookLogin";
import LoginSuccess from "./components/LoginSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FacebookLogin />} />
        <Route path="/success" element={<LoginSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
