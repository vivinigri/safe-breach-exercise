import React from "react"
import "./components.css"
import { Formik, Field, Form } from "formik"
import { convertDate } from "./../helpers"

export default function ContactEdit({ contact, saveContact, cancel }) {
  return (
    <div className="card">
      <div className="cardContent">
        <img
          src={require(`./../assets/images/${contact.picture}`).default}
          alt="avatar"
          className="avatar"
        />
        <div className="details">
          <Formik
            initialValues={{
              name: contact.name,
              birthday: contact.birthday.split("T")[0],
              phone: contact.phone_number,
              address: contact.address,
            }}
            validate={(values) => {
              const errors = {}
              // NAME
              if (!values.name) {
                errors.name = "⚠️ Required"
              } else if (values.name.length < 3) {
                errors.name = "⚠️ Too short"
              } else if (/[!@#$%^&*(),.?":{}|<>]/i.test(values.name)) {
                errors.name = "⚠️ Special characters are not allowed"
              } else if (/[0-9]/i.test(values.name)) {
                errors.name = "⚠️ Numbers are not allowed"
                // BIRTHDAY
              } else if (!values.birthday) {
                errors.birthday = "⚠️ Required"
                // PHONE
              } else if (!values.phone) {
                errors.phone = "⚠️ Required"
              } else if (!/\([0-9]{3}\) [0-9]{7}/i.test(values.phone)) {
                errors.phone = "⚠️ Wrong pattern (xxx) xxxxxxx"
                // ADDRESS
              } else if (!values.address) {
                errors.address = "⚠️ Required"
              } else if (values.address.length < 20) {
                errors.address = "⚠️ Insert full address"
              } else if (/[!@#$%^&*().?":{}|<>]/i.test(values.address)) {
                errors.address = "⚠️ Special characters are not allowed"
              }

              return errors
            }}
            onSubmit={(values) => {
              saveContact({
                ...contact,
                name: values.name,
                birthday: convertDate(values.birthday, contact.birthday),
                phone_number: values.phone,
                address: values.address,
              })
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <p>
                  <span className="detailsSpan">Name: </span>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`input ${
                      errors.name && touched.name ? " error" : ""
                    }`}
                  />
                </p>
                {errors.name && touched.name && (
                  <div className="feedback">{errors.name}</div>
                )}
                <p>
                  <span className="detailsSpan">Birthday: </span>
                  <Field
                    id="birthday"
                    name="birthday"
                    data-testid="bday"
                    type="date"
                    className={`input ${
                      errors.birthday && touched.birthday ? " error" : ""
                    }`}
                  />
                </p>
                {errors.birthday && touched.birthday && (
                  <div className="feedback">{errors.birthday}</div>
                )}
                <p>
                  <span className="detailsSpan">Phone: </span>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`input ${
                      errors.phone && touched.phone ? " error" : ""
                    }`}
                  />
                </p>
                {errors.phone && touched.phone && (
                  <div className="feedback">{errors.phone}</div>
                )}
                <p>
                  <span className="detailsSpan">Address: </span>
                  <Field
                    id="address"
                    name="address"
                    className={`input ${
                      errors.address && touched.address ? " error" : ""
                    }`}
                  />
                </p>
                {errors.address && touched.address && (
                  <div className="feedback">{errors.address}</div>
                )}

                <p className="icon" onClick={cancel}>
                  ❌
                </p>

                <button
                  type="submit"
                  className="icon"
                  style={{ right: "60px" }}
                  data-testid="save"
                >
                  💾
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
