import axios from "axios";
import { useState } from "react";

function Messages() {
  const [informations, setInformations] = useState({});
  //   const [message, setMessage] = useState([]);

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
      await axios.post("https://ironrest.herokuapp.com/whatsapp", form);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>userName</h1> 
      <p>
        Enter your message, choose the time and recipient of your contact list
      </p>

      <form onSubmit={handleSubmit}>
        <lable>Message</lable>
        <textarea name="message" value={form.message} onChange={handleChange} />

        <lable>Hours</lable>
        <input
          name="hours"
          type="time"
          value={form.hours}
          onChange={handleChange}
        />

        <lable>Recipient</lable>
        <input
          name="recipient"
          value={form.recipient}
          onChange={handleChange}
        />

        <button type="submit">Schedule Message</button>
      </form>
    </>
  );
}
export default Messages;
