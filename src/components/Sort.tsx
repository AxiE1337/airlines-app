import { FC, memo, useEffect, useMemo, useState } from 'react'
import { getAirLines } from '../utils/getAirlines'
import { IFilterByPrice, IFilters } from '../utils/useFilter'
import { useDebounceState } from 'useful-custom-react-hooks'

const Sort: FC<ISortProps> = ({ setFilters }) => {
  const [airlines, setAirlines] = useState<
    { uid: string; caption: string; airlineCode: string }[]
  >([])
  const [airlinesFilter, setAirlinesFilter] = useState<string[]>([])
  const [price, setPrice] = useDebounceState<IFilterByPrice>(
    {
      from: 0,
      to: 1000000,
    },
    1000
  )

  useEffect(() => {
    setFilters((prev) => ({ ...prev, price: price, airlines: airlinesFilter }))
  }, [price, airlinesFilter])

  useMemo(() => {
    setAirlines(getAirLines())
  }, [])

  return (
    <div className="flex flex-col w-[400px] min-h-screen p-2">
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Сортировать</h1>
        <span className="flex gap-1">
          <input
            name="sort"
            type="radio"
            id="byAscendingPrice"
            onChange={() =>
              setFilters((prev) => ({ ...prev, sort: 'byAscendingPrice' }))
            }
          />
          <label htmlFor="byAscendingPrice">По возростанию цены</label>
        </span>
        <span className="flex gap-1">
          <input
            name="sort"
            type="radio"
            id="byDescendingPrice"
            onChange={() =>
              setFilters((prev) => ({ ...prev, sort: 'byDescendingPrice' }))
            }
          />
          <label htmlFor="byDescendingPrice">По Убыванию цены</label>
        </span>
        <span className="flex gap-1">
          <input
            value="byTimeInFlight"
            name="sort"
            type="radio"
            id="byTimeInFlight"
            onChange={() =>
              setFilters((prev) => ({ ...prev, sort: 'byTimeInFlight' }))
            }
          />
          <label htmlFor="byTimeInFlight">По времени в пути</label>
        </span>
      </section>
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Фильтровать</h1>
        <span className="flex gap-1">
          <input
            type="radio"
            id="1stopover"
            name="filter"
            onChange={() => {
              setFilters((prev) => ({ ...prev, filter: 'onestopover' }))
            }}
          />
          <label className="select-none" htmlFor="1stopover">
            1 пересадка
          </label>
        </span>
        <span className="flex gap-1">
          <input
            type="radio"
            id="nostopover"
            name="filter"
            onChange={() => {
              setFilters((prev) => ({ ...prev, filter: 'nostopover' }))
            }}
          />
          <label className="select-none" htmlFor="nostopover">
            без пересадок
          </label>
        </span>
      </section>
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Цена</h1>
        <span className="flex gap-1 items-center">
          <label htmlFor="inputPriceFrom">От</label>
          <input
            className="input input-bordered"
            type="number"
            min={0}
            id="inputPriceFrom"
            onChange={(e) => {
              setPrice({ ...price, from: Number(e.target.value) })
            }}
            defaultValue={0}
          />
        </span>
        <span className="flex gap-1 items-center">
          <label htmlFor="inputPriceTo">До</label>
          <input
            className="input input-bordered"
            type="number"
            min={0}
            id="inputPriceTo"
            onChange={(e) => {
              setPrice({ ...price, to: Number(e.target.value) })
            }}
            defaultValue={1000000}
          />
        </span>
      </section>
      <section className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">Авиа компании</h1>
        {airlines.map((airline, index) => (
          <span key={index} className="flex gap-2 items-center">
            <input
              type="checkbox"
              id={airline.uid}
              onChange={(e) => {
                const { checked } = e.target
                if (checked) {
                  setAirlinesFilter((prev) => [...prev, airline.uid])
                } else {
                  setAirlinesFilter((prev) =>
                    prev.filter((i) => i !== airline.uid)
                  )
                }
              }}
            />
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
  setFilters: (value: React.SetStateAction<IFilters>) => void
}
