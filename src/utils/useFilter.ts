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

  const handleFilter = () => {
    const { filter, price, airlines, sort } = filters

    let filtered = data.result.flights.filter((f) => {
      const oneStopover =
        filter === 'onestopover' ? f.flight.legs[0].segments.length === 2 : f
      const noStopover =
        filter === 'nostopover' ? f.flight.legs[0].segments.length === 1 : f

      const priceFrom = Number(f.flight.price.total.amount) > Number(price.from)
      const priceTo = Number(f.flight.price.total.amount) < Number(price.to)

      return oneStopover && noStopover && priceFrom && priceTo
    })
    const filteredAirlines = [] as IFlightInfo[]
    if (airlines.length > 0) {
      for (let i of airlines) {
        filteredAirlines.push(
          ...[...filtered.filter((a) => a.flight.carrier.uid === i)]
        )
      }
      filtered = filteredAirlines
    }

    let sorted = [] as IFlightInfo[]
    switch (sort) {
      case 'byAscendingPrice':
        sorted = filtered.sort((a, b) => {
          return (
            Number(a.flight.price.total.amount) -
            Number(b.flight.price.total.amount)
          )
        })
        break
      case 'byDescendingPrice':
        sorted = filtered.sort((a, b) => {
          return (
            Number(b.flight.price.total.amount) -
            Number(a.flight.price.total.amount)
          )
        })
        break
      case 'byTimeInFlight':
        sorted = filtered.sort((a, b) => {
          return a.flight.legs[0].duration - b.flight.legs[0].duration
        })
        break
    }
    filtered = sorted

    setFlights({ result: { flights: filtered } })
  }

  useEffect(() => {
    handleFilter()
  }, [filters])

  return { flights, filters, setFilters }
}

export type SortType =
  | 'byAscendingPrice'
  | 'byDescendingPrice'
  | 'byTimeInFlight'

export type FilterType = 'onestopover' | 'nostopover' | ''

export interface IFilterByPrice {
  from: number
  to: number
}

export interface IFilters {
  sort: SortType
  filter: FilterType
  price: IFilterByPrice
  airlines: string[]
}
