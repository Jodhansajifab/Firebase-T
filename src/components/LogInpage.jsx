import { useState, useEffect } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

const LogInpage = () => {

  const [User, setUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const handlenamechange = (e) => {
    setName(e.target.value)
  }
  const handleagechange = (e) => {
    setAge(e.target.value)
  }
  const handlelocationchange = (e) => {
    setLocation(e.target.value)
  }

  const navigate = useNavigate();

  useEffect(() => {
    const listen = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("userToken");
        });
      console.log("Logout successful");
      navigate("/");
      alert("Logout successful");
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "userDetails"), {
        Name : name,
        Age: age,
        Location: location
      });
      alert("Successfully uploaded")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleveiwchange = async() =>{
    try {
      const querySnapshot = await getDocs(collection(db, "userDetails"));
      querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex justify-between">
        {User ? (
          <p className="text-xl font-bold ">
            Welcome {User.email}...How are you?
          </p>
        ) : (
          <> Wrong Credentials....</>
        )}
        <br />
        <button type="button" onClick={handleLogout} className="text-xl">
          SignOut
        </button>
      </div>

      <br />
      <br />

      <h2 className="text-2xl">Enter the your personal details</h2>

      <br />
      <br />

      <div >
        <form className="flex justify-between" onSubmit={handleSubmit}>

          <label className="block">Name: </label>
          <input type="input" value={name} onChange={handlenamechange}></input>
          <label className="block">Age: </label>
          <input type="input" value={age} onChange={handleagechange}></input>
          <label className="block">Location: </label>
          <input type="input" value={location} onChange={handlelocationchange}></input>
          
          <button type="submit" className="flex justify-center"> Submit</button>
        </form>
      </div>
      <br />

      <button onClick={handleveiwchange} >Veiw Saved</button>
    </>
  );
};

export default LogInpage;
