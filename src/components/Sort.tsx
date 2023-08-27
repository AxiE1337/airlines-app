import { FC, memo, useMemo, useState } from 'react'
import { getAirLines } from '../utils/getAirlines'
import { SortType } from '../utils/useFilter'

const Sort: FC<ISortProps> = ({ handleSort }) => {
  const [airlines, setAirlines] = useState<
    { uid: string; caption: string; airlineCode: string }[]
  >([])
  useMemo(() => {
    setAirlines(getAirLines())
  }, [])

  return (
    <div className="flex flex-col w-[400px] min-h-screen p-2">
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Сортировать</h1>
        <span className="flex gap-1">
          <input
            value="byAscendingPrice"
            name="sort"
            type="radio"
            id="byAscendingPrice"
            onClick={() => handleSort('byAscendingPrice')}
          />
          <label htmlFor="byAscendingPrice">По возростанию цены</label>
        </span>
        <span className="flex gap-1">
          <input
            value="byDescendingPrice"
            name="sort"
            type="radio"
            id="byDescendingPrice"
            onClick={() => handleSort('byDescendingPrice')}
          />
          <label htmlFor="byDescendingPrice">По Убыванию цены</label>
        </span>
        <span className="flex gap-1">
          <input
            value="byTimeInFlight"
            name="sort"
            type="radio"
            id="byTimeInFlight"
            onClick={() => handleSort('byTimeInFlight')}
          />
          <label htmlFor="byTimeInFlight">По времени в пути</label>
        </span>
      </section>
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Фильтровать</h1>
        <span className="flex gap-1">
          <input type="checkbox" id="1stopover" />
          <label htmlFor="1stopover">1 пересадка</label>
        </span>
        <span className="flex gap-1">
          <input type="checkbox" id="nostopover" />
          <label htmlFor="nostopover">без пересадок</label>
        </span>
      </section>
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Цена</h1>
        <span className="flex gap-1 items-center">
          <label htmlFor="inputPriceFrom">От</label>
          <input
            className="input input-bordered"
            type="text"
            id="inputPriceFrom"
            defaultValue={0}
          />
        </span>
        <span className="flex gap-1 items-center">
          <label htmlFor="inputPriceTo">До</label>
          <input
            className="input input-bordered"
            type="text"
            id="inputPriceTo"
            defaultValue={1000000}
          />
        </span>
      </section>
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Авиа компании</h1>
        {airlines.map((airline, index) => (
          <span key={index} className="flex gap-2 items-center">
            <input type="checkbox" id={airline.uid} />
            <label className="select-none" htmlFor={airline.uid}>
              {airline.caption}
            </label>
          </span>
        ))}
      </section>
    </div>
  )
}

export default memo(Sort)

interface ISortProps {
  handleSort: (value: SortType) => void
}
