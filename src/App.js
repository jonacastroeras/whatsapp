import "./App.css";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router-dom"
import {Toaster, toast} from "react-hot-toast"

function App() {
  return (
    <div>
      <Toaster/> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages/:messageID" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
