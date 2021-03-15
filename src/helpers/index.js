const milliToDays = 60 * 60 * 24 * 1000

export const getAgeByBday = (birthday) => {
  const bday = new Date(birthday.split("T")[0]).getTime()
  const today = new Date().getTime()
  const diff = (today - bday) / milliToDays
  return Math.abs(Math.floor(diff / 365.25))
}

export const convertDate = (newDate, bday) => {
  return `${newDate}T${bday.split("T")[1]}`
}
