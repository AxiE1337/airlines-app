import { useState } from 'react'
import flightsData from './data/flights.json'
import { IFlightsInfo } from './types/types'
import Flight from './components/Flight'
import Sort from './components/Sort'
import { useFilter } from './utils/useFilter'

function App() {
  const [numberOfFlights, setNumberOfFlights] = useState<number>(2)
  const { flights, handleSort } = useFilter(flightsData as IFlightsInfo)
  const showMore = () => {
    setNumberOfFlights((prev) => prev + 2)
  }

  return (
    <main className="flex min-h-screen items-start justify-center">
      <Sort handleSort={handleSort} />
      <div className="flex flex-col my-4 w-full items-center gap-4">
        {flights.result.flights
          .slice(0, numberOfFlights)
          .map((flight, index) => (
            <Flight flightInfo={flight} key={index} />
          ))}
        <button className="btn btn-primary my-4" onClick={showMore}>
          Показать ещё
        </button>
      </div>
    </main>
  )
}

export default App
