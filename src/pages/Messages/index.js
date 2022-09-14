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
            await axios.post("https://ironhack.solnustec.com/qrcode/" + userData._id, {
                message: form.message,
                number: form.recipient,
            });
            await axios.put(
                `https://ironrest.herokuapp.com/whatsapp/${params.messageID}`,
                { messages: userData.messages }
            );
            setReload(!reload);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(index) {
        // e.preventDefault();
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

    return (
        <>
            <div className="homeBody">
                <h1>{userData.userName}</h1>
                <p>
                    Enter your message, choose the time and the phone number of your
                    contact list
                </p>
                <div>
                    <form onSubmit={handleSubmit} className="columnFlex">
                        <div className="formGroup">
                            <label>Hours</label>
                            <h6>Indicate the time your message should be sent</h6>
                            <input
                                name="hours"
                                type="datetime-local"
                                value={form.hours}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="formGroup">
                            <label>Recipient</label>
                            <h6>
                                The phone number must be indicated as follows: +(country
                                code)(phone number with area code)
                            </h6>
                            <input
                                name="recipient"
                                value={form.recipient}
                                onChange={handleChange}
                                placeholder={"ex: +5511999999999"}
                            />
                        </div>
                        <div className="formGroup">
                            <label>Message</label>
                            <h6>Type your message exactly as you want to send it</h6>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder={"ex: Hi! This is WhatsTime"}
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
