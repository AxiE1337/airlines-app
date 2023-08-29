import { IFlightsInfo } from '../types/types'
import { FilterType } from './useFilter'
import flightsInfo from '../data/flights.json'

export const getAirLines = (filter: FilterType) => {
  const data = flightsInfo as IFlightsInfo
  const airlines: IAirlinesSort[] = []

  if (filter === 'nostopover') {
    const noStopover = data.result.flights.filter((f) => {
      return (
        f.flight.legs[0].segments.length === 1 &&
        f.flight.legs[1].segments.length === 1
      )
    })

    for (let i of noStopover) {
      const { carrier } = i.flight
      const isHave = airlines.find((a) => a.caption.includes(carrier.caption))
      if (!isHave) {
        airlines.push({
          airlineCode: carrier.airlineCode,
          caption: carrier.caption,
          uid: carrier.uid,
          disabled: false,
        })
      }
    }
  }

  for (let i of data.result.flights) {
    const { carrier } = i.flight
    const isHave = airlines.find((a) => a.caption.includes(carrier.caption))
    if (!isHave) {
      airlines.push({
        airlineCode: carrier.airlineCode,
        caption: carrier.caption,
        uid: carrier.uid,
        disabled: filter === 'nostopover',
      })
    }
  }

  return airlines.sort((a, b) => a.uid.localeCompare(b.uid))
}

export interface IAirlinesSort {
  uid: string
  caption: string
  airlineCode: string
  disabled: boolean
}
