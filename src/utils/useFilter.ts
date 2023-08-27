import { useState } from 'react'
import { IFlightInfo, IFlightsInfo } from '../types/types'

export const useFilter = (data: IFlightsInfo) => {
  const [flights, setFlights] = useState<IFlightsInfo>(data)

  const handleSort = (value: SortType) => {
    let sorted = [] as IFlightInfo[]
    switch (value) {
      case 'byAscendingPrice':
        sorted = data.result.flights.sort((a, b) => {
          return (
            Number(a.flight.price.total.amount) -
            Number(b.flight.price.total.amount)
          )
        })
        break
      case 'byDescendingPrice':
        sorted = data.result.flights.sort((a, b) => {
          return (
            Number(b.flight.price.total.amount) -
            Number(a.flight.price.total.amount)
          )
        })
        break
      case 'byTimeInFlight':
        sorted = data.result.flights.sort((a, b) => {
          return a.flight.legs[0].duration - b.flight.legs[0].duration
        })
        break
    }
    setFlights({ result: { flights: sorted } })
  }

  const handleFilter = (value: FilterType) => {}

  return { flights, handleSort }
}

export type SortType =
  | 'byAscendingPrice'
  | 'byDescendingPrice'
  | 'byTimeInFlight'
export type FilterType = '1stopover' | 'nostopover'

interface IFilterOpts {
  oneStopover: boolean
  noStopover: boolean
}
