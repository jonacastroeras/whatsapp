import { Link } from "react-router-dom";


function Register() {
  return (
    <>
      {/* qr code */}

      <form>
        <lable>Username</lable>
        <input></input>

        <label>Password</label>
        <input type="password"></input>

        <Link to="/messages">
        <button>Login</button>
        </Link>
      </form>
    </>
  );
}
export default Register;
