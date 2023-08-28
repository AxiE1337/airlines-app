const convertMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`

  return `🕓 ${hoursStr} ч ${minsStr} мин`
}

export default convertMinutesToHours
