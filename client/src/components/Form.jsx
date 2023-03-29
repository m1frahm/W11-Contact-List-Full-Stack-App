import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const MyForm = ({ onSaveContact, editingContact, onUpdateContact }) => {
  // This is the original State with not initial contact
  const [contact, setContact] = useState(
    editingContact || {
      name: "",
      email: "",
      phone: "",
      show: "",
    }
  );

  //create functions that handle the event of the user typing into the form
  //think back to KC on this
  const handleNameChange = (event) => {
    const name = event.target.value;
    console.log(name); // testing
    setContact((contact) => ({ ...contact, name }));
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setContact((contact) => ({ ...contact, email }));
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setContact((contact) => ({ ...contact, phone }));
  };

  const handleShowChange = (event) => {
    const show = event.target.value;
    setContact((contact) => ({ ...contact, show }));
  };

  // this is to clear the form (you can't reload the page on react)
  const clearForm = () => {
    setContact({ name: "", email: "", phone: "", show: "" });
  };

  //A function to handle the POST request (which lets you add on front/save in new data on back)
  const postContact = (newContact) => {
    return fetch("http://localhost:9000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Contacts from the parent to updating the list
        onSaveContact(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the PUT request which lets you edit
  const putContact = (toEditContact) => {
    return fetch(`http://localhost:9000/api/contacts/${toEditContact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditContact),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateContact(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.id) {
      putContact(contact);
    } else {
      postContact(contact);
    }
  };

  return (
    <Form className="form-students" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Full Name</Form.Label>
        <input
          type="text"
          id="add-user-name"
          placeholder="Full Name"
          required
          value={contact.name}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <input
          type="text"
          id="add-user-email"
          placeholder="Email"
          required
          value={contact.email}
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <input
          type="text"
          id="add-user-phone" // this might be integer?
          placeholder="Phone"
          required
          value={contact.phone}
          onChange={handlePhoneChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Show</Form.Label>
        <input
          type="text"
          id="add-user-show"
          placeholder="Show"
          required
          value={contact.show}
          onChange={handleShowChange}
        />
      </Form.Group>
      {/* Commenting out Form Check below bc not relevant and not needed */}
      {/* <Form.Check
        type={"checkbox"}
        id={`isCurrent`}
        checked={student.is_current}
        onChange={handleCheckChange}
        label={`Are they in the current program?`}
      /> */}
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {contact.id ? "Edit Contact" : "Add Contact"}
        </Button>
        {contact.id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default MyForm;
