export interface IFlightInfo {
  hasExtendedFare: boolean
  flight: {
    carrier: {
      uid: string
      caption: string
      airlineCode: string
    }
    price: {
      total: {
        amount: string
        currency: string
        currencyCode: string
      }
      totalFeeAndTaxes: {
        amount: string
        currency: string
        currencyCode: string
      }
      rates: {
        totalUsd: {
          amount: string
          currencyCode: string
        }
        totalEur: {
          amount: string
          currencyCode: string
        }
      }
      passengerPrices: {
        total: {
          amount: string
          currency: string
          currencyCode: string
        }
        passengerType: {
          uid: string
          caption: string
        }
        singlePassengerTotal: {
          amount: string
          currency: string
          currencyCode: string
        }
        passengerCount: number
        tariff: {
          amount: string
          currency: string
          currencyCode: string
        }
        feeAndTaxes: {
          amount: string
          currency: string
          currencyCode: string
        }
      }[]
    }
    servicesStatuses: {
      baggage: {
        uid: string
        caption: string
      }
      exchange: {
        uid: string
        caption: string
      }
      refund: {
        uid: string
        caption: string
      }
    }
    legs: {
      duration: number
      segments: {
        classOfServiceCode: string
        classOfService: {
          uid: string
          caption: string
        }
        departureAirport: {
          uid: string
          caption: string
        }
        departureCity: {
          uid: string
          caption: string
        }
        aircraft: {
          uid: string
          caption: string
        }
        travelDuration: number
        arrivalCity: {
          uid: string
          caption: string
        }
        arrivalDate: string
        flightNumber: string
        techStopInfos: any[]
        departureDate: string
        stops: number
        servicesDetails: {
          freeCabinLuggage: any
          paidCabinLuggage: any
          tariffName: string
          fareBasis: {
            ADULT: string
          }
          freeLuggage: {
            ADULT: {
              pieces: number
              nil: boolean
              unit: string
            }
          }
          paidLuggage: any
        }
        airline: {
          uid: string
          caption: string
          airlineCode: string
        }
        starting: boolean
        arrivalAirport: {
          uid: string
          caption: string
        }
      }[]
    }[]
  }
  flightToken: string
}
export interface IFlightsInfo {
  result: { flights: IFlightInfo[] }
}
