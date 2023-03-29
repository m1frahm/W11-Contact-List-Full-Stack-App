const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({
    message: "Hey there, this is from My template ExpressJS with React-Vite",
  });
});

// create the get request for contacts in the endpoint '/api/contacts'
app.get("/api/contacts", async (req, res) => {
  try {
    const { rows: contacts } = await db.query("SELECT * FROM contacts");
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// sample w cristina create the get request for students in the endpoint '/api/students'
app.get("/api/contacts", async (req, res) => {
  const contacts = [
    {
      id: 1,
      name: "Ina Garden",
      email: "ina@foodnetwork.com",
      phone: `111 - 111 - 1111`,
      show: "Barefoot Contessa",
    },
    {
      id: 2,
      name: " Jamie Oliver",
      email: "jame@jameoliver.com",
      phone: `222 - 222 - 2222`,
      show: "Jamie's One Pan Wonder's",
    },
    {
      id: 3,
      name: " Ahmed Alzahabi",
      email: "ahmed@goldenbalance.com",
      phone: `333 - 333 - 333`,
      show: "The Golden Balance",
    },
  ];
  res.json(contacts);

  //need to do try & catch when calling DB this time we are connecting to SQL
  try {
    const { rows: contacts } = await db.query("SELECT * FROM contacts");
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request (this way we can add a new contact)
app.post("/api/contacts", async (req, res) => {
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      show: req.body.show,
    };
    //console.log([newContact]);
    const result = await db.query(
      "INSERT INTO contacts(name, email, phone, show) VALUES($1, $2, $3, $4) RETURNING *",
      [newContact.name, newContact.email, newContact.phone, newContact.show]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for contact
app.delete("/api/students/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId;
    await db.query("DELETE FROM contacts WHERE id=$1", [contactId]);
    console.log("From the delete request-url", contactId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a contact/edit a contact
app.put("/api/contacts/:contactId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the contact to be updated
  const contactId = req.params.studentId;
  const updatedContact = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    show: req.body.show,
  };
  console.log("In the server from the url - the contact id", contactId);
  console.log(
    "In the server, from the react - the student to be edited/updated",
    updatedContact
  );
  // UPDATE contacts SET name = "something" WHERE id="16";
  const query = `UPDATE students SET name=$1, email=$2, phone=$3, show=$4 WHERE id=${contactId} RETURNING *`;
  const values = [
    updatedContact.name,
    updatedContact.email,
    updatedContact.phone,
    updatedContact.show,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Back-End Server listening on ${PORT}`);
});
