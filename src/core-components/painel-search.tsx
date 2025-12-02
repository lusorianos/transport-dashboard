import Text from '../components/text'
import Card from '../components/card'
import Button from '../components/button'
import InputText from '../components/input'

import PainelList from './painel-list'
import { useShipments } from '../context/ShipmentContext'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function PainelSearch() {
  const {
    updateSearchFilters,
    clearSearchFilters,
    searchFilters,
    filtered
  } = useShipments()

  const [showResults, setShowResults] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmpty =
      !searchFilters.id &&
      !searchFilters.origem &&
      !searchFilters.destino

    if (isEmpty) {
      toast.warning("Preencha pelo menos um campo para realizar a pesquisa.")
      setShowResults(false)
      return
    }

    if (filtered.length === 0) {
      toast.error("Nenhum resultado encontrado.")
      setShowResults(false)
      return
    }

    setShowResults(true)
  }

  const handleClear = () => {
    clearSearchFilters()
    setShowResults(false)
    toast.info("Filtros limpos.")
  }

  return (
    <Card size="lg">
      <Text as="h1" variant="body-3xl" className="mb-8">
        Painel de acompanhamento
      </Text>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 [&>input]:flex-1">
          <InputText
            label="ID"
            placeholder="Informe o ID"
            value={searchFilters.id ?? ""}
            onChange={e => updateSearchFilters({ id: e.target.value })}
          />

          <InputText
            label="Origem"
            placeholder="Informe a origem"
            value={searchFilters.origem ?? ""}
            onChange={e => updateSearchFilters({ origem: e.target.value })}
          />

          <InputText
            label="Destino"
            placeholder="Informe o destino"
            value={searchFilters.destino ?? ""}
            onChange={e => updateSearchFilters({ destino: e.target.value })}
          />
        </div>

        <div className="flex gap-4 justify-end [&>button]:flex-1 md:[&>button]:flex-0">
          <Button
            type="button"
            className="text-red-base border-red-base"
            onClick={handleClear}
          >
            Limpar
          </Button>

          <Button variant="secondary" type="submit">
            Pesquisar
          </Button>
        </div>
      </form>

      {/* Mostra resultados apenas após pesquisa válida */}
      {showResults && filtered.length > 0 && (
        <div className="mt-10">
          <PainelList filter="Todos" />
        </div>
      )}
    </Card>
  )
}