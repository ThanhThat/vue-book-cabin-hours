export const formatDate = (input) => {
  const datePart = input.match(/\d+/g)

  const dayNumber = Number(datePart[2])
  const monthNumber = Number(datePart[1])

  const year = datePart[0] // get only two digits
  const month = monthNumber < 10 ? `0${monthNumber}` : datePart[1]
  const day = dayNumber < 10 ? `0${dayNumber}` : datePart[2]
  return day + '-' + month + '-' + year
}

export const generateDate = (day, month, year) => {
  return day + '-' + month + '-' + year
}

export const compareDate = (today, date) => {
  const todayArr = today?.split('-')
  const dateArr = date?.split('-')

  if (Number(todayArr[2]) > Number(dateArr[2])) return true
  else if (Number(todayArr[2]) < Number(dateArr[2])) return false
  else if (Number(todayArr[1]) > Number(dateArr[1])) return true
  else if (Number(todayArr[1]) < Number(dateArr[1])) return false
  else if (Number(todayArr[0]) > Number(dateArr[0])) return true
  return false
}
