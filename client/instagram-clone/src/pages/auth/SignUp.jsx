import "./SignUp.css";
import instagram_logo from "../../assets/instagram_logo.png";

function SignUp() {
  return (
    <>
      <form className="signup-form">
        <img src={instagram_logo} alt="Instagram Logo" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="fullname" placeholder="Full Name" />
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" name="submit" value="Sign Up" />
      </form>
    </>
  );
}

export default SignUp;
