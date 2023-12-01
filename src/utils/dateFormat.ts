type DateType = (isoDateString: string) => string

const dateformat: DateType = (isoDateString) => {
  const date = new Date(isoDateString)

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

  return formattedDate
}

export default dateformat
