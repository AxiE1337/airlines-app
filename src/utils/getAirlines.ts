import { IFlightsInfo } from '../types/types'
import flightsInfo from '../data/flights.json'

export const getAirLines = () => {
  const data = flightsInfo as IFlightsInfo
  const airlines: { uid: string; caption: string; airlineCode: string }[] = []

  for (let i of data.result.flights) {
    const { carrier } = i.flight

    const isHave = airlines.find((a) => a.caption.includes(carrier.caption))

    if (!isHave) {
      airlines.push(carrier)
    }
  }
  return airlines
}
