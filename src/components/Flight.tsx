import { FC, memo } from 'react'
import { IFlightInfo } from '../types/types'
import formatDate from '../utils/formatDate'

const Flight: FC<IFlightProps> = ({ flightInfo }) => {
  const flightTo = flightInfo.flight.legs[0]
  const flightBack = flightInfo.flight.legs[1]
  return (
    <div className="flex flex-col items-center justify-center w-4/5">
      <section className="flex flex-col items-end bg-blue-600 text-white p-2 w-full">
        <h1 className="text-2xl">
          {
            flightInfo.flight.price.passengerPrices[0].singlePassengerTotal
              .amount
          }{' '}
          Р
        </h1>
        <h2>Стоимость для одного взрослого пассажира</h2>
      </section>
      {/* flight to */}
      <div className="flex flex-col content-start w-full px-4">
        <section className="flex gap-2 my-4">
          <h1 className="font-semibold">{`${flightTo.segments[0]?.departureCity.caption}, ${flightTo.segments[0]?.departureAirport.caption}`}</h1>
          <p>-</p>
          <h1 className="font-semibold">{`${
            flightTo.segments[flightTo.segments.length - 1]?.arrivalCity
              ?.caption
          }, ${
            flightTo.segments[flightTo.segments.length - 1]?.arrivalAirport
              .caption
          }`}</h1>
        </section>
        <section className="flex flex-col my-4">
          <div className="flex gap-4">
            {formatDate(flightTo.segments[0].departureDate)}
            <p>-</p>
            {formatDate(
              flightTo.segments[flightTo.segments.length - 1].arrivalDate,
              false
            )}
          </div>
          <h2>
            {flightTo.segments.length > 1
              ? `${flightTo.segments.length - 1} пересадка`
              : ''}
          </h2>
        </section>
        <h2 className="my-4">
          Рейс выполняет: {flightTo.segments[0]?.airline?.caption}
        </h2>
      </div>
      <span className="w-full bg-blue-600 h-1 my-2"></span>
      {/* flight back */}
      <div className="flex flex-col content-start w-full px-4">
        <section className="flex gap-2 my-4">
          <h1 className="font-semibold">{`${flightBack.segments[0]?.departureCity?.caption}, ${flightBack.segments[0]?.departureAirport?.caption}`}</h1>
          <p>-</p>
          <h1 className="font-semibold">{`${
            flightBack.segments[flightBack.segments.length - 1]?.arrivalCity
              ?.caption
          }, ${
            flightBack.segments[flightBack.segments.length - 1]?.arrivalAirport
              ?.caption
          }`}</h1>
        </section>
        <section className="flex flex-col my-4">
          <div className="flex gap-4">
            {formatDate(flightBack.segments[0].departureDate)}
            <p>-</p>
            {formatDate(
              flightBack.segments[flightBack.segments.length - 1].arrivalDate,
              false
            )}
          </div>
          <h2>
            {flightBack.segments.length > 1
              ? `${flightTo.segments.length - 1} пересадка`
              : ''}
          </h2>
        </section>
        <h2 className="my-4">
          Рейс выполняет: {flightBack.segments[0]?.airline?.caption}
        </h2>
      </div>
      <button className="btn btn-neutral my-1 w-full">Выбрать</button>
    </div>
  )
}

export default memo(Flight)

interface IFlightProps {
  flightInfo: IFlightInfo
}
