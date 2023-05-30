import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebase.js";
import "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Nagivating user to login page if previously logged In
  useEffect(() => {
    const storedUser = localStorage.getItem("userToken");

    if (storedUser) {
      navigate("/loginapp");
    }
  }, []);

  //Handling the changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        //save the user uid to localstorage
        .then((userinfo) => {
          localStorage.setItem("userToken", JSON.stringify(userinfo.user.uid));
        }); 

      // Navigate to '/loginapp' after successful login
      console.log("Login successful");
      navigate("/loginapp"); 

    } catch (error) {
      console.log("Login error:", error.message);
      alert("No user registered with these credentials");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      alert(error.message);
    }
    setEmail("");
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>

      <br />

      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <br />

      <div className="buttons">
        <button type="submit">Login</button>

        <button type="button" onClick={handleResetPassword}>
          Forget Password
        </button>
      </div>

      <br />

      <>
        New User?{" "}
        <Link to="/SignUp">
          <button>Signup</button>
        </Link>{" "}
      </>
    </form>
  );
};

export default SignIn;
