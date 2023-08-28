import { IFlightsInfo } from './types/types'
import { useState } from 'react'
import { useFilter } from './utils/useFilter'
import flightsData from './data/flights.json'
import Flight from './components/Flight'
import Sort from './components/Sort'

function App() {
  const [numberOfFlights, setNumberOfFlights] = useState<number>(2)
  const { flights, handleSort, setFilters } = useFilter(
    flightsData as IFlightsInfo
  )
  const showMore = () => {
    setNumberOfFlights((prev) => prev + 2)
  }

  return (
    <main className="flex min-h-screen items-start justify-center">
      <Sort handleSort={handleSort} setFilters={setFilters} />
      <div className="flex flex-col my-4 w-full items-center gap-4">
        {flights.result.flights
          .slice(0, numberOfFlights)
          .map((flight, index) => (
            <Flight flightInfo={flight} key={index} />
          ))}
        <button
          disabled={flights.result.flights.length < numberOfFlights}
          className="btn btn-primary my-4"
          onClick={showMore}
        >
          Показать ещё
        </button>
      </div>
    </main>
  )
}

export default App
