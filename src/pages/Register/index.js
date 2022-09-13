import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const [usersName, setUsersName] = useState([]);


    const [form, setForm] = useState({
        userName: "",
        password: ""
      });
    
      function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
    
        try {
          await axios.post("https://ironrest.herokuapp.com/whatsapp", form);
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <>
      {/* qr code condicional*/}

      <form onSubmit={handleSubmit}>
        <lable>Username</lable>
        <input name="userName"
          value={form.userName}
          onChange={handleChange}/>

        <label>Password</label>
        <input 
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}/>

        <Link to="/messages">
        <button>Login</button>
        </Link>
      </form>
    </>
  );
}
export default Register;
