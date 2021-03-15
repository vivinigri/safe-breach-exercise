import { contacts } from "./../../data/contacts"
import { getContact, deleteById, updateById } from "./../../data/api"

export const yellowPages = {
  state: {
    allContacts: [...contacts],
    contacts: [],
    error: "",
  },
  reducers: {
    setContacts: (state, contacts) => {
      return {
        ...state,
        contacts,
      }
    },
    setAllContacts: (state, allContacts) => {
      return {
        ...state,
        allContacts,
      }
    },
    setError: (state, error) => ({
      ...state,
      error,
    }),
  },
  effects: (dispatch) => ({
    async fetchContacts(payload, rootState) {
      dispatch.yellowPages.setError("")
      try {
        const { allContacts } = rootState.yellowPages
        const contact = await getContact(allContacts, payload)
        dispatch.yellowPages.setContacts(contact)
        if (!contact.length) {
          dispatch.yellowPages.setError("😞 No results found.")
        }
      } catch (error) {
        dispatch.yellowPages.setError(error.message)
      }
    },
    async deleteContact(payload, rootState) {
      try {
        const { allContacts } = rootState.yellowPages
        const newContacts = await deleteById(allContacts, payload)
        dispatch.yellowPages.setAllContacts(newContacts)
      } catch (error) {
        dispatch.yellowPages.setError(error.message)
      }
    },
    async editContact(payload, rootState) {
      try {
        const { allContacts } = rootState.yellowPages
        const newContacts = await updateById(allContacts, payload)
        dispatch.yellowPages.setAllContacts(newContacts)
      } catch (error) {
        dispatch.yellowPages.setError(error.message)
      }
    },
  }),
}
