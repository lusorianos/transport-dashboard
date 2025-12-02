import { useState, useMemo } from "react";
import Button from "../components/button";
import Text from "../components/text";
import SquareIcon from "../assets/icons/square.svg?react";
import ListIcon from "../assets/icons/list.svg?react";
import { useShipments } from "../context/ShipmentContext";
import PainelItem from "./painel-item";
import type { FilterType } from "./painel-filter";
import Container from "../components/container";

type Props = {
  filter: FilterType;
};

export default function PainelList({ filter }: Props) {
  const { shipments, searchFilters } = useShipments();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const filteredShipments = useMemo(() => {
    return shipments.filter((ship) => {
      const matchFilter = filter === "Todos" || ship.tipo === filter;

      const matchId =
        !searchFilters.id ||
        ship.id.toLowerCase().includes(searchFilters.id.toLowerCase());

      const matchOrigem =
        !searchFilters.origem ||
        ship.origem.toLowerCase().includes(searchFilters.origem.toLowerCase());

      const matchDestino =
        !searchFilters.destino ||
        ship.destino
          .toLowerCase()
          .includes(searchFilters.destino.toLowerCase());

      return matchFilter && matchId && matchOrigem && matchDestino;
    });
  }, [shipments, searchFilters, filter]);

  const list = filteredShipments.map((item) => (
    <PainelItem key={item.id} item={item} viewMode={viewMode} />
  ));

  return (
    <>
      <Container
        as="section"
        className="hidden md:flex justify-end gap-2 items-center mb-4"
      >
        <Text variant="body-sm">Exibição:</Text>

        <Button
          size="sm"
          variant={viewMode === "grid" ? "tertiaryActive" : "tertiary"}
          icon={SquareIcon}
          onClick={() => setViewMode("grid")}
        >
          Card
        </Button>

        <Button
          size="sm"
          variant={viewMode === "list" ? "tertiaryActive" : "tertiary"}
          icon={ListIcon}
          onClick={() => setViewMode("list")}
        >
          Lista
        </Button>
      </Container>

      {viewMode === "grid" && (
        <Container
          as="section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {list}
        </Container>
      )}

      {viewMode === "list" && (
        <Container as="section" className="flex flex-col gap-4">
          {list}
        </Container>
      )}
    </>
  );
}