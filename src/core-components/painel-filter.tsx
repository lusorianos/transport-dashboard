import { useState } from "react";
import Button from '../components/button'
import Text from '../components/text'
import BoatIcon from "../assets/icons/ship.svg?react";
import AirplaneIcon from "../assets/icons/airplane.svg?react";
import TruckIcon from "../assets/icons/truck.svg?react";
import Container from "../components/container";

export type FilterType = "Todos" | "Marítimo" | "Aéreo" | "Rodoviário";

type Props = {
  onFilterChange: (filter: FilterType) => void;
};

export default function PainelFilter({ onFilterChange }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todos");

  const handleClick = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <Container as="section">
      <Text as="h2" variant="body-xl">Gestão de embarques</Text>
      <div className="grid lg:flex grid-cols-2 px-0! gap-3 my-4 [&>button]:flex-1">
        <Button
          variant={activeFilter === "Todos" ? "secondary" : "primary"}
          onClick={() => handleClick("Todos")}
        >
          Todos
        </Button>
        <Button
          icon={BoatIcon}
          variant={activeFilter === "Marítimo" ? "secondary" : "primary"}
          onClick={() => handleClick("Marítimo")}
        >
          Marítimo
        </Button>
        <Button
          icon={AirplaneIcon}
          variant={activeFilter === "Aéreo" ? "secondary" : "primary"}
          onClick={() => handleClick("Aéreo")}
        >
          Aéreo
        </Button>
        <Button
          icon={TruckIcon}
          variant={activeFilter === "Rodoviário" ? "secondary" : "primary"}
          onClick={() => handleClick("Rodoviário")}
        >
          Rodoviário
        </Button>
      </div>
    </Container>
  );
}