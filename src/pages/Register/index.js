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

  async function handleSubmit() {
    console.log("handleSubmit");
  }

  async function userExist(e) {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/whatsapp"
      );
      const newArray = response.data.filter((usersName) =>
        usersName.userName.includes(form.userName)
      );
      console.log(newArray);
      if (newArray.lenght > 0) {
        navigate(`/messages/${newArray[0]._id}`);
        return;
      } else {
        try {
          const response = await axios.post(
            "https://ironrest.herokuapp.com/whatsapp",
            form
          );
          navigate(`/messages/${response.data.insertedId}`);
        } catch (error) {
          console.log(error);
        }
      }

      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  function loginUser(e) {
    e.preventDefault();
    console.log(!userExist());
    if (!userExist()) {
      handleSubmit();
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

        <Link to="/messages/:messagesID">
          <button onClick={loginUser}>Login</button>
        </Link>
      </form>
    </>
  );
}
export default Register;
