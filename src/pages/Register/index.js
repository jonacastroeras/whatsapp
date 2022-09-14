import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { AiFillWarning } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";

function Register() {
  const [users, setUsers] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    userName: "",
    password: "",
    messages: [],
  });

  async function getQrCode(receivedUserId) {
    try {
      const getQrCode = await axios.get(
        "http://localhost:3100/qrcode/" + receivedUserId
      );
      setQrCode(getQrCode.data.qrCode);
    } catch (error) {
      console.log("Server is down");
    }
  }

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
        setUserId(response.data.insertedId);
        await getQrCode(response.data.insertedId);
        setShowQrCode(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (userExists.password === form.password) {
        toast.success(
          "Welcome to your message area! Send a new message or check the ones already sent"
        );
        navigate(`/messages/${userExists._id}`);
      } else {
        toast.error(
          "User or password incorrect, try again, or make a new registration"
        );
      }
    }
  }

  async function completeRegistration() {
    navigate(`/messages/${userId}`);
  }

  async function userExist() {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/whatsapp"
      );
      setUsers(response.data);
      const newArray = response.data.filter((user) => {
        if (user.userName) return user.userName.includes(form.userName);
      });
      if (newArray.length > 0) {
        return newArray[0];
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  return (
    <>
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
            <button className="loginButton">LOGIN</button>
          </div>

          <div className="qrCode">
            {!showQrCode && (
              <>
                <AiFillWarning />
                <p>
                  The <strong> QR Code will appear</strong> in this area, if you
                  do not have registration. Scan in the "Connected Devices" area
                  on WhatsApp of your mobile phone.
                </p>
              </>
            )}

            {showQrCode && (
              <>
                <QRCode value={qrCode} fgColor="#35879B" />
              </>
            )}
          </div>
          {showQrCode && (
            <>
              <button onClick={completeRegistration}>
                Complete Registration
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
export default Register;
