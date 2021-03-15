import React from "react"
import "./components.css"
import { getAgeByBday } from "./../helpers"

export default function ContactDisplay({
  contact,
  index,
  removeContact,
  editContact,
}) {
  return (
    <div className="card" key={index}>
      <div className="cardContent">
        <img
          src={require(`./../assets/images/${contact.picture}`).default}
          alt="avatar"
          className="avatar"
        />
        <div className="details">
          <p>
            <span className="detailsSpan">Name: </span>
            {contact.name}
          </p>
          <p>
            <span className="detailsSpan">Age: </span>
            {getAgeByBday(contact.birthday)}
          </p>
          <p>
            <span className="detailsSpan">Phone: </span>
            {contact.phone_number}
          </p>
          <p>
            <span className="detailsSpan">Address: </span>
            {contact.address}
          </p>
        </div>
        <p
          className="icon"
          onClick={() => removeContact(contact._id)}
          data-testid="delete"
        >
          🗑️
        </p>
        <p
          className="icon"
          style={{ right: "60px" }}
          onClick={() => editContact(contact._id)}
          data-testid="edit"
        >
          ✏️
        </p>
      </div>
    </div>
  )
}
