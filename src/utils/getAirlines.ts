import { IFlightsInfo } from '../types/types'
import flightsInfo from '../data/flights.json'

export const getAirLines = () => {
  const data = flightsInfo as IFlightsInfo
  const airlines: { uid: string; caption: string; airlineCode: string }[] = []

  for (let i of data.result.flights) {
    const { airline } = i.flight.legs[1].segments[0]

    const isHave = airlines.find((a) => a.caption.includes(airline.caption))

    if (!isHave) {
      airlines.push(airline)
    }
  }
  return airlines
}
