import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Messages() {
    const params = useParams()
    console.log("params", params)
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)
    //   const [message, setMessage] = useState([]);
    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const response = await axios.get(`https://ironrest.herokuapp.com/whatsapp/${params.messageID}`)
            setUserData(response.data)
            setIsLoading(false)
        }
        getUserData()
    }, [reload])
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
            userData.messages.push(form)
            await axios.post("http://localhost:3100/qrcode/" + userData._id, { message: form.message, number: form.recipient })
            await axios.put(`https://ironrest.herokuapp.com/whatsapp/${params.messageID}`, { messages: userData.messages });
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
                            <textarea name="message" value={form.message} onChange={handleChange} />
                        </div>
                        <div className="formGroup">
                            <button type="submit">Schedule Message</button>
                        </div>
                    </form>
                </div>
                <div>
                    <ul>{!isLoading && (
                        <>
                            {userData.messages.map((element) => {
                                return <li>{element.message}</li>
                            })}
                        </>
                    )

                    }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Messages;
