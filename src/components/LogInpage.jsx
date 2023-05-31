import { useState, useEffect, useId } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import { uid } from 'uid';
 
const LogInpage = () => {

  const [User, setUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [fetchedData, SetfetchedData] = useState("")

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
        id: uid(),
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

  const handleVeiwchange = async() =>{
    try {
      const querySnapshot = await getDocs(collection(db, "userDetails"));
      const newData = []
      querySnapshot.forEach((doc) => {
      newData.push(doc.data());
      });
      SetfetchedData(newData);
    } catch (error) {
      console.log(error)
    }
  }

  const handleVeiwchangeAge = async() =>{
    try {
      const q = query(collection(db, "userDetails"), orderBy("Age"));
      const querySnapshotsorted = await getDocs(q);
      const newData = []
      querySnapshotsorted.forEach((doc) => {
      newData.push(doc.data());
      });
      SetfetchedData(newData);
    } catch (error) {
      console.log(error)
    }
  }
  const handleVeiwchangeName = async() =>{
    try {
      const q = query(collection(db, "userDetails"), orderBy("Name"));
      const querySnapshotsorted = await getDocs(q);
      const newData = []
      querySnapshotsorted.forEach((doc) => {
      newData.push(doc.data());
      });
      SetfetchedData(newData);
    } catch (error) {
      console.log(error)
    }
  }
  const handleVeiwchangeLocation = async() =>{
    try {
      const q = query(collection(db, "userDetails"), orderBy("Location"));
      const querySnapshotsorted = await getDocs(q);
      const newData = []
      querySnapshotsorted.forEach((doc) => {
      newData.push(doc.data());
      });
      SetfetchedData(newData);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async() => {
    await deleteDoc(doc(db, "userDetails", id));
  }

  return (
    <>
      <div className="flex justify-between">
        {User ? (
          <p className="text-xl flex">
            Welcome..
            <span className="font-bold underline decoration-sky-500">{User.email}</span>
            ...How are you?
          </p>
        ) : (
          <span> Wrong Credentials....</span>
        )}
        <br />
        <button type="button" onClick={handleLogout} className="text-xl text-red-500">
          SignOut
        </button>
      </div>

      <h2 className="text-2xl p-20">Enter the details to upload</h2>

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

      <button onClick={handleVeiwchange} className="m-10">Veiw Saved</button>
      <button onClick={handleVeiwchangeAge} className="m-10">Veiw Data Sorted by Age</button>
      <button onClick={handleVeiwchangeName} className="m-10">Veiw Data Sorted by Name</button>
      <button onClick={handleVeiwchangeLocation} className="m-10">Veiw Data Sorted by Location</button>

      <div className="flex justify-center p-10 ">
      {fetchedData.length > 0 ? (
        <ul>
          {fetchedData.map((item) => (
            <li key={item.id}>
             <>Name: </> {item.Name}
             <br/>
             <>Age: </>{item.Age}
             <br/>
             <>Location: </>{item.Location}
             <br/>
             <br/>
             <button>Edit</button>
             <button onClick={handleDelete}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
    </>
  );
};

export default LogInpage;
