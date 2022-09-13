import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [usersName, setUsersName] = useState([]);

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

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

  async function userExist(e) {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/whatsapp"
      );
      const newArray = response.data.filter((usersName) =>
        usersName.userName.includes(form.userName)
      );
      if (newArray.lenght > 0) {
        console.log("existe");
        navigate ("/messages")
      }

      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  function loginUser(e) {
    e.preventDefault();

    if (!userExist()) {
      handleSubmit(e);
    }
  }

  return (
    <>
      {/* qr code condicional*/}

      <form>
        <label>Username</label>
        <input name="userName" value={form.userName} onChange={handleChange} />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <Link to="/messages">
          <button onClick={loginUser}>Login</button>
        </Link>
      </form>
    </>
  );
}
export default Register;
