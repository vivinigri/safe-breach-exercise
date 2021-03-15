import { getAgeByBday } from "./../helpers"

const simulateApiCall = async () => {
  const error = Math.random() * 100 === 18
  if (error) {
    throw new Error("☠️ An error occurred")
  } else {
    await new Promise((r) => setTimeout(r, Math.random() * 3000))
  }
}

export const getContact = async (allContacts, payload) => {
  await simulateApiCall()
  const contact = allContacts.filter((el) => {
    return (
      payload.name.some((n) =>
        el.name.toLowerCase().includes(n.toLowerCase())
      ) &&
      (!payload.age.length
        ? true
        : payload.age.some((a) => getAgeByBday(el.birthday) === parseInt(a))) &&
      (!payload.phone.length
        ? true
        : payload.phone.some((p) => el.phone_number.includes(p)))
    )
  })
  return contact
}

export const deleteById = async (allContacts, id) => {
  await simulateApiCall()
  const newContacts = allContacts.filter((el) => el._id !== id)
  return newContacts
}

export const updateById = async (allContacts, contact) => {
  await simulateApiCall()
  const newContacts = [...allContacts]
  const index = newContacts.findIndex((el) => el._id === contact._id)
  newContacts[index] = contact
  return newContacts
}
