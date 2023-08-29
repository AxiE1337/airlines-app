import { FC, memo, useEffect, useMemo, useState } from 'react'
import { IAirlinesSort, getAirLines } from '../utils/getAirlines'
import { IFilterByPrice, IFilters } from '../utils/useFilter'
import { useDebounceState } from 'useful-custom-react-hooks'
import SwapBtn from './ui/SwapBtn'

const Sort: FC<ISortProps> = ({ setFilters, filters, open, setOpen }) => {
  const [airlines, setAirlines] = useState<IAirlinesSort[]>([])
  const [airlinesFilter, setAirlinesFilter] = useState<string[]>([])
  const [price, setPrice] = useDebounceState<IFilterByPrice>(
    {
      from: 0,
      to: 1000000,
    },
    1000
  )

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    setFilters((prev) => ({ ...prev, price: price, airlines: airlinesFilter }))
  }, [price, airlinesFilter])

  useMemo(() => {
    setAirlines(getAirLines(filters.filter))
  }, [filters.filter])

  return (
    <>
      <SwapBtn onClick={handleOpen} />
      <div
        className={`flex flex-col w-[400px] min-h-screen bg-white z-20 p-2 transition-all md:pt-10 md:fixed md:top-0 md:left-0 ${
          !open ? 'md:-translate-x-full' : 'md:translate-x-0 md:w-full'
        }`}
        data-drawer-prevent-scroll="main"
      >
        <section className="flex flex-col gap-2 p-4">
          <h1 className="font-medium">Сортировать</h1>
          <span className="flex items-center gap-1">
            <input
              name="sort"
              type="radio"
              id="byAscendingPrice"
              className="cursor-pointer"
              defaultChecked={filters.sort === 'byAscendingPrice'}
              onChange={() =>
                setFilters((prev) => ({ ...prev, sort: 'byAscendingPrice' }))
              }
            />
            <label className="cursor-pointer" htmlFor="byAscendingPrice">
              - По возростанию цены
            </label>
          </span>
          <span className="flex items-center gap-1">
            <input
              name="sort"
              type="radio"
              id="byDescendingPrice"
              className="cursor-pointer"
              defaultChecked={filters.sort === 'byDescendingPrice'}
              onChange={() =>
                setFilters((prev) => ({ ...prev, sort: 'byDescendingPrice' }))
              }
            />
            <label className="cursor-pointer" htmlFor="byDescendingPrice">
              - По Убыванию цены
            </label>
          </span>
          <span className="flex items-center gap-1">
            <input
              value="byTimeInFlight"
              name="sort"
              type="radio"
              id="byTimeInFlight"
              className="cursor-pointer"
              defaultChecked={filters.sort === 'byTimeInFlight'}
              onChange={() =>
                setFilters((prev) => ({ ...prev, sort: 'byTimeInFlight' }))
              }
            />
            <label className="cursor-pointer" htmlFor="byTimeInFlight">
              - По времени в пути
            </label>
          </span>
        </section>
        <section className="flex flex-col gap-2 p-4">
          <h1 className="font-medium">Фильтровать</h1>
          <span className="flex items-center gap-1">
            <input
              type="radio"
              id="1stopover"
              name="filter"
              className="cursor-pointer"
              defaultChecked={filters.filter === 'onestopover'}
              onChange={() => {
                setFilters((prev) => ({ ...prev, filter: 'onestopover' }))
              }}
            />
            <label className="select-none cursor-pointer" htmlFor="1stopover">
              - 1 пересадка
            </label>
          </span>
          <span className="flex items-center gap-1">
            <input
              type="radio"
              id="nostopover"
              name="filter"
              className="cursor-pointer"
              defaultChecked={filters.filter === 'nostopover'}
              onChange={() => {
                setFilters((prev) => ({ ...prev, filter: 'nostopover' }))
              }}
            />
            <label className="select-none cursor-pointer" htmlFor="nostopover">
              - без пересадок
            </label>
          </span>
          <span className="flex items-center gap-1">
            <input
              type="radio"
              id="doesntmatter"
              name="filter"
              className="cursor-pointer"
              defaultChecked={filters.filter === 'doesntmatter'}
              onChange={() => {
                setFilters((prev) => ({ ...prev, filter: 'doesntmatter' }))
              }}
            />
            <label
              className="select-none cursor-pointer"
              htmlFor="doesntmatter"
            >
              - не важно
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
          <h1 className="font-medium">Авиакомпании</h1>
          {airlines.map((airline, index) => (
            <span key={index} className="flex gap-2 items-center">
              <input
                className="checkbox"
                type="checkbox"
                id={airline.uid}
                disabled={airline.disabled}
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
              <label
                className={`select-none ${
                  airline.disabled
                    ? 'cursor-not-allowed opacity-70'
                    : 'cursor-pointer'
                }`}
                htmlFor={airline.uid}
              >
                {airline.caption}
              </label>
            </span>
          ))}
        </section>
      </div>
    </>
  )
}

export default memo(Sort)

interface ISortProps {
  setFilters: (value: React.SetStateAction<IFilters>) => void
  filters: IFilters
  open: boolean
  setOpen: (value: React.SetStateAction<boolean>) => void
}
