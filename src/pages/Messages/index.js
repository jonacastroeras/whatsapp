import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Messages() {
  const params = useParams();
  console.log("params", params);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  //   const [message, setMessage] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/whatsapp/${params.messageID}`
      );
      setUserData(response.data);
      setIsLoading(false);
    }
    getUserData();
  }, [reload]);

  const [form, setForm] = useState({
    message: "",
    hours: "",
    recipient: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      userData.messages.push(form);
      await axios.put(
        `https://ironrest.herokuapp.com/whatsapp/${params.messageID}`,
        { messages: userData.messages }
      );
      setReload(!reload);
      setForm({ message: "", hours: "", recipient: "" });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(index) {
    // e.preventDefault();
    try {
      const clone = { ...form.messages };
      delete clone._id;

      clone.messages.splice(index, 1);

      await axios.put(
        `https://ironrest.herokuapp.com/whatsapp/${form._id}`,
        clone
      );

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="homeBody">
        <h1>{userData.userName}</h1>
        <p>
          Enter your message, choose the time and recipient of your contact list
        </p>
        <div>
          <form onSubmit={handleSubmit} className="columnFlex">
            <div className="formGroup">
              <label>Hours</label>
              <input
                name="hours"
                type="time"
                value={form.hours}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label>Recipient</label>
              <input
                name="recipient"
                value={form.recipient}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <button type="submit">Schedule Message</button>
            </div>
          </form>
        </div>
        <div>
          <ul>
            {!isLoading && (
              <>
                {userData.messages.map((element, index) => {
                  return (
                    <>
                      <li>{element.message}</li>
                      <button
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  );
                })}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Messages;
