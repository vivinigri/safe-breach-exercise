import { useEffect, useState } from "react"
import "./App.css"
import { dispatch } from "./store"
import { useSelector } from "react-redux"
import { Formik, Form, Field } from "formik"
import ContactDisplay from "./components/ContactDisplay"
import ContactEdit from "./components/ContactEdit"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [payload, setPayload] = useState()

  const contacts = useSelector((state) => state.yellowPages.contacts)
  const error = useSelector((state) => state.yellowPages.error)

  /* useEffect(async () => {
    setIsLoading(true)
    await dispatch.yellowPages.fetchContacts()
    setIsLoading(false)
  }, []) */

  const removeContact = async (id) => {
    setIsLoading(true)
    await dispatch.yellowPages.deleteContact(id)
    await dispatch.yellowPages.fetchContacts(payload)
    setIsLoading(false)
  }

  const saveContact = async (contact) => {
    setIsLoading(true)
    await dispatch.yellowPages.editContact(contact)
    await dispatch.yellowPages.fetchContacts(payload)
    setIsLoading(false)
    setEditingId(null)
  }

  const searchContact = async (query) => {
    setIsLoading(true)
    setPayload(query)
    await dispatch.yellowPages.fetchContacts(query)
    setIsLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">Yellow Pages 📒</h2>
        <p>Find 🧑🏻‍🤝‍🧑🏻 by Name 📇, Phone 📞 or Age 📅</p>
        <Formik
          initialValues={{ query: "" }}
          validate={(values) => {
            const errors = {}
            if (!values.query) {
              errors.query = "⚠️ Required"
            } else if (/[!@#$%^&*,.?":{}|<>]/i.test(values.query)) {
              errors.query = "⚠️ Special characters are not allowed"
            } else if (values.query) {
              const arr = values.query.split(" ")
              arr.forEach((el) => {
                if (/^(?=.*[a-zA-Z])(?=.*[0-9])/i.test(el)) {
                  errors.query = `⚠️ ${el} doesn't look like a valid name, phone or age`
                }
              })
            }
            return errors
          }}
          onSubmit={(values) => {
            const query = {
              name: [],
              age: [],
              phone: [],
            }
            const arr = values.query.split(" ")
            arr.forEach((el) => {
              if (/[a-zA-Z]+/i.test(el)) {
                query.name.push(el)
              } else if (el[0] === "(" || el[0] === "0" || el.length > 3) {
                query.phone.push(el)
              } else if (parseInt(el) < 150) {
                query.age.push(el)
              } else if (el.length > 3) {
                query.phone.push(el)
              }
            })
            if (query.name.length === 0) query.name.push("")
            searchContact(query)
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="formContainer">
                <Field
                  name="query"
                  className={`input ${
                    errors.query && touched.query ? " error" : ""
                  }`}
                  data-testid="query"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submitBtn"
                >
                  🔎 Search
                </button>
              </div>
              {errors.query && touched.query && (
                <div className="feedback">{errors.query}</div>
              )}
            </Form>
          )}
        </Formik>
        {error && (
          <div className="feedback" data-testid="feedback">
            {error}
          </div>
        )}
        {isLoading ? (
          <p>🚧 Loading</p>
        ) : editingId ? (
          contacts
            .filter((c) => c._id === editingId)
            .map((contact, index) => (
              <ContactEdit
                key={index}
                contact={contact}
                saveContact={saveContact}
                cancel={() => setEditingId(null)}
              />
            ))
        ) : (
          contacts.map((contact, index) => (
            <ContactDisplay
              key={index}
              contact={contact}
              removeContact={removeContact}
              editContact={(id) => setEditingId(id)}
            />
          ))
        )}
      </header>
    </div>
  )
}

export default App
