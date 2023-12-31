import { IFlightsInfo } from './types/types'
import { useState } from 'react'
import { useFilter } from './utils/useFilter'
import flightsData from './data/flights.json'
import Flight from './components/Flight'
import Sort from './components/Sort'

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [numberOfFlights, setNumberOfFlights] = useState<number>(2)
  const { flights, setFilters, filters } = useFilter(
    flightsData as IFlightsInfo
  )
  const showMore = () => {
    setNumberOfFlights((prev) => prev + 2)
  }

  return (
    <main
      className={`flex ${
        open ? 'h-screen overflow-hidden' : 'min-h-screen'
      } items-start justify-center`}
    >
      <Sort
        setFilters={setFilters}
        filters={filters}
        open={open}
        setOpen={setOpen}
      />
      <div className="flex flex-col my-4 w-full items-center gap-4">
        {flights.result.flights
          .slice(0, numberOfFlights)
          .map((flight, index) => (
            <Flight flightInfo={flight} key={index} />
          ))}
        <button
          disabled={flights.result.flights.length < numberOfFlights}
          className="btn btn-ghost my-4 btn-outline rounded-none"
          onClick={showMore}
        >
          Показать ещё
        </button>
      </div>
    </main>
  )
}

export default App
