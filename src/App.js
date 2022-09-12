import "./App.css";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
