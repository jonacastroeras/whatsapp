import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>WhatsDate</h1>

      <p>
        Extension created to schedule the time of your messages on your whatsApp
      </p>

      <Link to="/register">
        <button>Register</button>
        <button>Login</button>
      </Link>
    </>
  );
}
export default HomePage;
