import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Contact from "./Contact";

const ListContacts = () => {
  // this is my original state with an array of contacts
  const [contacts, setContacts] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingContact, setEditingContact] = useState(null);

  const loadContacts = () => {
    // A function to fetch the list of contacts that will be load anytime that list change
    fetch("http://localhost:9000/api/contacts")
      .then((response) => response.json())
      .then((students) => {
        setContacts(contacts);
      });
  };

  useEffect(() => {
    loadContacts();
  }, [contacts]);

  const onSaveContact = (newContact) => {
    //console.log(newContact, "From the parent - List of Contacts"); //testing purposes only
    setContacts((contacts) => [...contacts, newContact]);
  };

  //A function to control the update in the parent (student component)
  const updateContact = (savedContact) => {
    // console.log("Line 29 savedContact", savedContact);
    // This function should update the whole list of contacts -
    loadContacts();
  };

  //A function to handle the Delete funtionality
  const onDelete = (contact) => {
    //console.log(contact, "delete method")
    return fetch(`http://localhost:9000/api/contacts/${contact.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadContacts();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateContact) => {
    //console.log(toUpdateStudent);
    setEditingContact(toUpdateContact);
  };

  return (
    <div className="mybody">
      <div className="list-contact">
        <h2>Food Network Food Festival Judges Guest List </h2>
        <ul>
          {contacts.map((contact) => {
            return (
              <li key={contact.id}>
                {" "}
                <Contact
                  contacts={contacts}
                  toDelete={onDelete}
                  toUpdate={onUpdate}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <MyForm
        key={editingContact ? editingContact.id : null}
        onSaveContact={onSaveContact}
        editingContact={editingContact}
        onUpdateContact={updateContact}
      />
    </div>
  );
};

export default ListContacts;
