import { FC, memo } from 'react'
import { IFlightInfo } from '../types/types'
import formatDate from '../utils/formatDate'
import convertMinutesToHours from '../utils/convertMinutesToHours'

const Flight: FC<IFlightProps> = ({ flightInfo }) => {
  const flightTo = flightInfo.flight.legs[0]
  const flightBack = flightInfo.flight.legs[1]
  return (
    <div className="flex flex-col items-center justify-center w-4/5">
      <section className="flex justify-between items-center bg-blue-600 text-white px-2 w-full">
        <h1 className="font-semibold text-xl select-none">
          {flightInfo.flight?.carrier.caption}
        </h1>
        <div className="flex flex-col items-end">
          <h1 className="text-2xl">
            {
              flightInfo.flight.price.passengerPrices[0].singlePassengerTotal
                .amount
            }{' '}
            Р
          </h1>
          <h2>Стоимость для одного взрослого пассажира</h2>
        </div>
      </section>
      {/* flight to */}
      <div className="flex flex-col content-start w-full px-6">
        <section className="flex gap-2 my-3">
          <h1 className="font-semibold">{`${flightTo.segments[0]?.departureCity.caption}, ${flightTo.segments[0]?.departureAirport.caption}`}</h1>
          <h1 className="text-blue-400">{`(${flightTo.segments[0]?.departureAirport.uid})`}</h1>
          <p className="text-blue-400">→</p>
          <h1 className="font-semibold">{`${
            flightTo.segments[flightTo.segments.length - 1]?.arrivalCity
              ?.caption
          }, ${
            flightTo.segments[flightTo.segments.length - 1]?.arrivalAirport
              .caption
          }`}</h1>
          <h1 className="text-blue-400">{`(${
            flightTo.segments[flightTo.segments.length - 1]?.arrivalAirport.uid
          })`}</h1>
        </section>
        <section className="flex flex-col items-center my-4 w-full">
          <div className="flex gap-4 w-full items-center justify-between">
            {formatDate(flightTo.segments[0].departureDate)}
            <h2 className="text-xl">
              {convertMinutesToHours(flightTo.duration)}
            </h2>
            {formatDate(
              flightTo.segments[flightTo.segments.length - 1].arrivalDate,
              false
            )}
          </div>
          <div className="relative flex justify-center p-1 w-4/5">
            <h2 className="bg-white px-2 text-orange-500 z-10">
              {flightTo.segments.length > 1
                ? `${flightTo.segments.length - 1} пересадка`
                : ''}
            </h2>
            <span className="absolute bg-black h-[1px] w-full top-2/4 left-0"></span>
          </div>
        </section>
        <h2 className="mb-3">
          Рейс выполняет: {flightTo.segments[0]?.airline?.caption}
        </h2>
      </div>
      <span className="w-full bg-blue-600 h-[2px]"></span>
      {/* flight back */}
      <div className="flex flex-col content-start w-full px-6">
        <section className="flex gap-2 my-3">
          <h1 className="font-semibold">{`${flightBack.segments[0]?.departureCity?.caption}, ${flightBack.segments[0]?.departureAirport?.caption}`}</h1>
          <h1 className="text-blue-400">{`(${flightBack.segments[0]?.departureAirport.uid})`}</h1>
          <p className="text-blue-400">→</p>
          <h1 className="font-semibold">{`${
            flightBack.segments[flightBack.segments.length - 1]?.arrivalCity
              ?.caption
          }, ${
            flightBack.segments[flightBack.segments.length - 1]?.arrivalAirport
              ?.caption
          }`}</h1>
          <h1 className="text-blue-400">{`(${
            flightBack.segments[flightBack.segments.length - 1]?.arrivalAirport
              .uid
          })`}</h1>
        </section>
        <section className="flex flex-col items-center my-4 w-full">
          <div className="flex gap-4 w-full items-center justify-between">
            {formatDate(flightBack.segments[0].departureDate)}
            <h2 className="text-xl">
              {convertMinutesToHours(flightBack.duration)}
            </h2>
            {formatDate(
              flightBack.segments[flightBack.segments.length - 1].arrivalDate,
              false
            )}
          </div>
          <div className="relative flex justify-center text-center p-1 w-4/5">
            <h2 className="bg-white px-2 text-orange-500 z-10">
              {flightBack.segments.length > 1
                ? `${flightBack.segments.length - 1} пересадка`
                : ''}
            </h2>
            <span className="absolute bg-black h-[1px] w-full top-2/4 left-0"></span>
          </div>
        </section>
        <h2 className="mb-3">
          Рейс выполняет: {flightBack.segments[0]?.airline?.caption}
        </h2>
      </div>
      <button className="btn btn-warning text-white bg-yellow-600 hover:bg-yellow-500 my-1 w-full">
        Выбрать
      </button>
    </div>
  )
}

export default memo(Flight)

interface IFlightProps {
  flightInfo: IFlightInfo
}
