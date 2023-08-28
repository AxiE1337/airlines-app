const formatDate = (
  inputDate: string,
  timeLeft: boolean = true
): JSX.Element => {
  const months = [
    'Янв.',
    'Фев.',
    'Мар.',
    'Апр.',
    'Май.',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сен.',
    'Окт.',
    'Ноя.',
    'Дек.',
  ]
  const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

  const date = new Date(inputDate)
  const day = date.getDate()
  const month = date.getMonth()
  const dayOfWeek = date.getDay()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return (
    <div className="flex gap-2 items-end justify-center">
      {timeLeft && (
        <h1 className="font-semibold text-xl">
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}
        </h1>
      )}
      <h3 className="text-blue-400">
        {day} {months[month]} {daysOfWeek[dayOfWeek]}
      </h3>
      {!timeLeft && (
        <h1 className="font-semibold text-xl">
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}
        </h1>
      )}
    </div>
  )
}

export default formatDate
