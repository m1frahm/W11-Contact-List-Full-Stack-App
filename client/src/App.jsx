import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListContacts from "./components/ListContacts.jsx";
import { useState, useEffect } from "react";

function App() {
  //Commenting out practice with get request - Please disregard line 9-24
  // const [contacts, setContacts] = useState([]);

  // //need function that will call to this http://localhost:9000/api/contacts
  // const loadContacts = () => {
  //   fetch("http://localhost:9000/api/contacts")
  //     .then((response) => response.json())
  //     .then((contacts) => {
  //       setContacts(contacts); //allows us to save the data coming in back end as the local data from component
  //     });
  // };

  // //useEffect tells React when to react to a change of data (every time contact changes reload the page) - must for every type of request
  // useEffect(() => {
  //   loadContacts();
  // }, [contacts]);

  return (
    <div className="App">
      <MyNavBar />
      <ListContacts />
    </div>
  );
}

export default App;
