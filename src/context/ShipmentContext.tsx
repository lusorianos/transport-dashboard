import { createContext, useContext, useMemo, useState } from "react"

export type Shipment = {
  createdAt?: any
  id: string
  tipo: "Rodoviário" | "Marítimo" | "Aéreo"
  origem: string
  destino: string
  etd: string
  eta: string
  status: "Em trânsito" | "Entregue" | "Aguardando" | "Cancelado" | "Preparando envio"
  progresso: number

  // NOVO — Coordenadas opcionais
  origemLat?: number
  origemLng?: number
  destinoLat?: number
  destinoLng?: number
}

type FilterType = "Todos" | "Rodoviário" | "Marítimo" | "Aéreo"
type DateFilter = "Hoje" | "7" | "15" | "30" | "MesAtual" | "Todos"

export type SearchFilters = {
  id?: string
  origem?: string
  destino?: string
}

type ShipmentContextType = {
  shipments: Shipment[]
  filtered: Shipment[]
  filterType: FilterType
  setFilterType: (t: FilterType) => void
  dateFilter: DateFilter
  setDateFilter: (d: DateFilter) => void
  statusCount: Record<string, number>

  // FILTRO DE BUSCA
  searchFilters: SearchFilters
  updateSearchFilters: (d: Partial<SearchFilters>) => void
  clearSearchFilters: () => void
}

const ShipmentContext = createContext<ShipmentContextType | null>(null)

/** Converte "YYYY-MM-DD" para Date local */
function parseDateLocal(str: string) {
  const p = str.split("-").map(Number)
  return new Date(p[0], p[1] - 1, p[2])
}

/** Compara somente Y/M/D */
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function ShipmentProvider({ children }: { children: React.ReactNode }) {

const shipments: Shipment[] = [
  {
    id: "S25DASH001",
    tipo: "Rodoviário",
    origem: "Brasil",
    destino: "México",
    etd: "2025-11-30",
    eta: "2025-12-05",
    status: "Em trânsito",
    progresso: 50,
    origemLat: -15.7801,
    origemLng: -47.9292,
    destinoLat: 19.4326,
    destinoLng: -99.1332
  },
  {
    id: "S25DASH002",
    tipo: "Marítimo",
    origem: "Brasil",
    destino: "Peru",
    etd: "2025-04-12",
    eta: "2025-04-20",
    status: "Entregue",
    progresso: 100,
    origemLat: -23.5505,
    origemLng: -46.6333,
    destinoLat: -12.0464,
    destinoLng: -77.0428
  },
  {
    id: "S25DASH003",
    tipo: "Aéreo",
    origem: "Argentina",
    destino: "Chile",
    etd: "2025-01-08",
    eta: "2025-01-10",
    status: "Aguardando",
    progresso: 0,
    origemLat: -34.6037,
    origemLng: -58.3816,
    destinoLat: -33.4489,
    destinoLng: -70.6693
  },
  {
    id: "S25DASH004",
    tipo: "Marítimo",
    origem: "Brasil",
    destino: "Bolívia",
    etd: "2025-06-03",
    eta: "2025-06-08",
    status: "Em trânsito",
    progresso: 50,
    origemLat: -25.4284,
    origemLng: -49.2733,
    destinoLat: -16.2902,
    destinoLng: -63.5887
  },
  {
    id: "S25DASH005",
    tipo: "Marítimo",
    origem: "Brasil",
    destino: "Estados Unidos",
    etd: "2025-09-15",
    eta: "2025-09-25",
    status: "Cancelado",
    progresso: 70,
    origemLat: -22.9068,
    origemLng: -43.1729,
    destinoLat: 29.7604,
    destinoLng: -95.3698
  },

  // ---- Novos Shipments ----

  {
    id: "S25DASH006",
    tipo: "Rodoviário",
    origem: "Uruguai",
    destino: "Brasil",
    etd: "2025-03-02",
    eta: "2025-03-06",
    status: "Entregue",
    progresso: 100,
    origemLat: -34.9011,
    origemLng: -56.1645,
    destinoLat: -30.0277,
    destinoLng: -51.2287
  },
  {
    id: "S25DASH007",
    tipo: "Aéreo",
    origem: "Colômbia",
    destino: "Argentina",
    etd: "2025-07-22",
    eta: "2025-07-24",
    status: "Em trânsito",
    progresso: 40,
    origemLat: 4.711,
    origemLng: -74.0721,
    destinoLat: -34.6037,
    destinoLng: -58.3816
  },
  {
    id: "S25DASH008",
    tipo: "Marítimo",
    origem: "Chile",
    destino: "Equador",
    etd: "2025-02-10",
    eta: "2025-02-14",
    status: "Aguardando",
    progresso: 0,
    origemLat: -33.4489,
    origemLng: -70.6693,
    destinoLat: -2.1709,
    destinoLng: -79.9223
  },
  {
    id: "S25DASH009",
    tipo: "Rodoviário",
    origem: "Brasil",
    destino: "Argentina",
    etd: "2025-08-05",
    eta: "2025-08-10",
    status: "Em trânsito",
    progresso: 30,
    origemLat: -27.5945,
    origemLng: -48.5477,
    destinoLat: -34.6037,
    destinoLng: -58.3816
  },
  {
    id: "S25DASH010",
    tipo: "Aéreo",
    origem: "México",
    destino: "Colômbia",
    etd: "2025-12-01",
    eta: "2025-12-03",
    status: "Aguardando",
    progresso: 0,
    origemLat: 19.4326,
    origemLng: -99.1332,
    destinoLat: 4.711,
    destinoLng: -74.0721
  },
  {
    id: "S25DASH011",
    tipo: "Rodoviário",
    origem: "Paraguai",
    destino: "Brasil",
    etd: "2025-04-28",
    eta: "2025-05-02",
    status: "Entregue",
    progresso: 100,
    origemLat: -25.2637,
    origemLng: -57.5759,
    destinoLat: -23.5505,
    destinoLng: -46.6333
  },
  {
    id: "S25DASH012",
    tipo: "Marítimo",
    origem: "Equador",
    destino: "México",
    etd: "2025-09-02",
    eta: "2025-09-14",
    status: "Em trânsito",
    progresso: 55,
    origemLat: -0.1807,
    origemLng: -78.4678,
    destinoLat: 19.4326,
    destinoLng: -99.1332
  }
];

  const [filterType, setFilterType] = useState<FilterType>("Todos")
  const [dateFilter, setDateFilter] = useState<DateFilter>("Todos")

  // NOVO – Filtros de Pesquisa
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({})

  const updateSearchFilters = (partial: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...partial }))
  }

  const clearSearchFilters = () => setSearchFilters({})

  /** FILTRO FINAL (tipo + data + busca) */
  const filtered = useMemo(() => {
    let data = [...shipments]

    /** 1) filtro por tipo */
    if (filterType !== "Todos") {
      data = data.filter(s => s.tipo === filterType)
    }

    /** 2) filtro por data */
    if (dateFilter !== "Todos") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const daysDiff = (a: Date, b: Date) =>
        Math.floor((a.getTime() - b.getTime()) / 86400000)

      data = data.filter(item => {
        const etd = parseDateLocal(item.etd)
        const eta = parseDateLocal(item.eta)
        etd.setHours(0, 0, 0, 0)
        eta.setHours(0, 0, 0, 0)

        switch (dateFilter) {
          case "Hoje":
            return sameDay(etd, today) || sameDay(eta, today)

          case "7":
          case "15":
          case "30":
            const range = Number(dateFilter)
            return (
              Math.abs(daysDiff(today, etd)) <= range ||
              Math.abs(daysDiff(today, eta)) <= range
            )

          case "MesAtual":
            return (
              etd.getMonth() === today.getMonth() &&
              etd.getFullYear() === today.getFullYear()
            )

          default:
            return true
        }
      })
    }

    /** 3) FILTRO DE BUSCA */
    if (searchFilters.id) {
      data = data.filter(s =>
        s.id.toLowerCase().includes(searchFilters.id!.toLowerCase())
      )
    }

    if (searchFilters.origem) {
      data = data.filter(s =>
        s.origem.toLowerCase().includes(searchFilters.origem!.toLowerCase())
      )
    }

    if (searchFilters.destino) {
      data = data.filter(s =>
        s.destino.toLowerCase().includes(searchFilters.destino!.toLowerCase())
      )
    }

    return data
  }, [filterType, dateFilter, searchFilters])

  /** CONTAGEM */
  const statusCount = useMemo(() => {
    const c: Record<string, number> = {
      Total: filtered.length,
      Entregue: 0,
      "Em trânsito": 0,
      Aguardando: 0,
      "Preparando envio": 0,
      Cancelado: 0
    }
    filtered.forEach(s => { c[s.status]++ })
    return c
  }, [filtered])

  return (
    <ShipmentContext.Provider value={{
      shipments,
      filtered,
      filterType,
      setFilterType,
      dateFilter,
      setDateFilter,
      statusCount,
      searchFilters,
      updateSearchFilters,
      clearSearchFilters
    }}>
      {children}
    </ShipmentContext.Provider>
  )
}

export function useShipments() {
  const ctx = useContext(ShipmentContext)
  if (!ctx) throw new Error("useShipments deve ser usado dentro de <ShipmentProvider>")
  return ctx
}