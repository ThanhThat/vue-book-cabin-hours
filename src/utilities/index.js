export const formatDate = (input) => {
  const datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1],
    day = datePart[2]

  return day + '-' + month + '-' + year
}

export const generateDate = (day, month, year) => {
  if (day < 10) {
    return '0' + day + '-' + month + '-' + year
  }

  return day + '-' + month + '-' + year
}
