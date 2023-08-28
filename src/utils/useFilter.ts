import { useState, useEffect } from 'react'
import { IFlightInfo, IFlightsInfo } from '../types/types'

export const useFilter = (data: IFlightsInfo) => {
  const [flights, setFlights] = useState<IFlightsInfo>(data)
  const [filters, setFilters] = useState<IFilters>({
    sort: 'byAscendingPrice',
    filter: '',
    price: {
      from: 0,
      to: 1000000,
    },
    airlines: [],
  })

  const handleSort = (value: SortType) => {
    let sorted = [] as IFlightInfo[]
    switch (value) {
      case 'byAscendingPrice':
        sorted = flights.result.flights.sort((a, b) => {
          return (
            Number(a.flight.price.total.amount) -
            Number(b.flight.price.total.amount)
          )
        })
        break
      case 'byDescendingPrice':
        sorted = flights.result.flights.sort((a, b) => {
          return (
            Number(b.flight.price.total.amount) -
            Number(a.flight.price.total.amount)
          )
        })
        break
      case 'byTimeInFlight':
        sorted = flights.result.flights.sort((a, b) => {
          return a.flight.legs[0].duration - b.flight.legs[0].duration
        })
        break
    }
    setFlights({ result: { flights: sorted } })
  }

  const handleFilter = () => {
    const { filter } = filters

    const filtered = data.result.flights.filter((f) => {
      const oneStopover =
        filter === 'onestopover' ? f.flight.legs[0].segments.length === 2 : f
      const noStopover =
        filter === 'nostopover' ? f.flight.legs[0].segments.length === 1 : f

      return oneStopover && noStopover
    })

    setFlights({ result: { flights: filtered } })
  }

  useEffect(() => {
    handleFilter()
  }, [filters])

  return { flights, handleSort, filters, setFilters }
}

export type SortType =
  | 'byAscendingPrice'
  | 'byDescendingPrice'
  | 'byTimeInFlight'

export type FilterType = 'onestopover' | 'nostopover' | ''

export interface IFilters {
  sort: SortType
  filter: FilterType
  price: {
    from: number
    to: number
  }
  airlines: string[]
}
