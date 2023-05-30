import { useState } from "react";
import "firebase/auth";
import firebase from "../firebase.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SignUp submitted");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("SignUp successful");
      alert("Account Created");
    } catch (error) {
      console.log("SignUp error:", error.message);
      alert("Wrong Credentials");
    }

    setEmail("");
    setPassword("");
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
        <button type="submit">SignUp</button>
      </div>
    </form>
  );
};

export default Signup;
