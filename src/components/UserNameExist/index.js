import axios from "axios";
import { useState } from "react";

function UserNameExist() {
    const [checkUser, setcheckUser] = useState("");


    async function consultUser() {
        try {
          const checkUser = await axios.get(
            "https://ironrest.herokuapp.com/whatsapp/"
          );
            consultUser()
        } catch (error) {
          console.log("error");
        }
      }

    return (
        <>
        </>
    )
}

export default UserNameExist