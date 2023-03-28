import React from "react";
import Card from "react-bootstrap/Card";
// import Button from 'react-bootstrap/Button';
// import * as ioicons from 'react-icons/io5'

const Contact = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {props.firstname} {props.lastname}
        </Card.Title>
        <Card.Title>{props.email}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Contact;
