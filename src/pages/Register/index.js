import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [usersName, setUsersName] = useState([]);

  const [form, setForm] = useState({
    userName: "",
    password: "",
    messages: [],
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userExists = await userExist();
    if (!userExists) {
      try {
        const response = await axios.post(
          "https://ironrest.herokuapp.com/whatsapp",
          form
        );
        navigate(`/messages/${response.data.insertedId}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate(`/messages/${userExists}`);
    }
  }

  async function userExist() {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/whatsapp"
      );
      const newArray = response.data.filter((user) => {
        if (user.userName) return user.userName.includes(form.userName);
      });
      console.log(newArray);
      if (newArray.length > 0) {
        return newArray[0]._id;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  return (
    <>
      {/* qr code condicional*/}
      <div className="homeBody">
        <form className="columnFlex" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>USERNAME</label>
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label>PASSWORD</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            {/* to="/messages/:messagesID" */}
            <button className="loginButton">LOGIN</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;
