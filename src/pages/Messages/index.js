import axios from "axios";
import whatsicon from "../../img/whatsicon.png"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClose, AiFillEdit, AiOutlineCalendar } from "react-icons/ai";
function Messages() {
  const params = useParams();
  console.log("params", params);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageEditId, setmessageEditId] = useState();
  const [reload, setReload] = useState(false);
  const [messageEdit, setmessageEdit] = useState(''); //atencao
  const [showForm, setShowForm] = useState(false);

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
    status: false,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    console.log("enter to handle submit", e)
    e.preventDefault();

    try {
      const newUserArray = { ...userData }
      newUserArray.messages.push(form)
      setUserData(newUserArray)
      // await axios.post("http://localhost:3100/qrcode/" + userData._id, {
      //   message: form.message,
      //   number: form.recipient,
      // });
      await axios.put(
        `https://ironrest.herokuapp.com/whatsapp/${params.messageID}`,
        { messages: newUserArray.messages }
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(index) {
    try {
      const clone = { ...userData };
      delete clone._id;

      clone.messages.splice(index, 1);

      await axios.put(
        `https://ironrest.herokuapp.com/whatsapp/${userData._id}`,
        clone
      );

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateMessage(e, element, index) {
    e.preventDefault();
    try {
      const clone = { ...userData };
      delete clone._id;
      const updateForm = {
        message: element.message,
        hours: element.hours,
        recipient: element.recipient,
        status: false,
      }
      setmessageEditId(index)
      setForm(updateForm)
      setShowForm(!showForm);
    } catch (error) {
      console.log(error);
    }
  }
  async function submitEdit() {
    const clone = { ...userData };
    delete clone._id;
    clone.messages[messageEditId] = form
    await axios.put(
      `https://ironrest.herokuapp.com/whatsapp/${userData._id}`,
      clone
    );
    setReload(!reload);
    setShowForm(!showForm);
    setForm({
      message: "",
      hours: "",
      recipient: "",
      status: false,
    })
  }

  return (
    <div className="homeBody">
      <div className="container">
        <div className="formSide">
          <div className="formHeader">
            <div className="iconHeader">
              <img src={whatsicon} width="40%" />
            </div>
            <div className="divWelcomeText">
              <h1>Welcome {userData.userName}!</h1>
              <p>
                Let's schedule your messages
              </p>
            </div>
          </div>
          <hr className="whitehr" />
          <div>
            <form onSubmit={handleSubmit} className="columnFlex">
              <div className="formGroup saveMessageFormGroup">
                <label><strong>Schedule to deliver:</strong></label>
                <p><small>Indicate the time your message should be sent</small></p>
                <input
                  name="hours"
                  type="datetime-local"
                  value={form.hours}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formGroup saveMessageFormGroup">
                <label><strong>Destinatary</strong></label>
                <p>
                  <small>
                    +[country
                    code][area number][phone number]
                  </small>
                </p>
                <input
                  name="recipient"
                  value={form.recipient}
                  onChange={handleChange}
                  placeholder={"ex: +5511999999999"}
                  required
                />
              </div>
              <div className="formGroup saveMessageFormGroup">
                <label><strong>Message</strong></label>
                <p><small>Type your message exactly as you want to send it</small></p>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={"ex: Hi! This is WhatsTime"}
                  rows="6"
                  required
                />
              </div>
              <div className="formGroup saveMessageFormGroup saveButtonMessageFormGroup">
                {showForm ? (
                  <button type="button" onClick={submitEdit}>Update Message</button>
                ) : (<button type="submit" className="buttonFlex"><AiOutlineCalendar size="15" /> &nbsp;Schedule Message</button>)}

              </div>
            </form>
          </div>
        </div>
        <div className="scheduledMessages">
          {!isLoading && (
            <>
              {userData.messages.map((element, index) => {
                return (
                  <span>
                    <div className="individualMessage">
                      <div className="messageData">
                        <p>
                          <strong><small>Destinatary:</small></strong><br />{element.recipient}<br />
                          <strong><small>Message:</small></strong><br />{element.message}<br />
                          <strong><small>Time to deliver:</small></strong><br />{element.hours}<br />
                        </p>
                      </div>
                      <div className="messageButtons">
                        <>
                          <button className="editMessageButton"
                            onClick={(event) =>
                              updateMessage(event, element, index)
                            }
                          >
                            <AiFillEdit className="editMessage" />
                          </button>
                          <button className="deleteMessageButton"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            <AiOutlineClose className="deleteMessage" />
                          </button>
                        </>
                      </div>
                    </div>
                  </span>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
