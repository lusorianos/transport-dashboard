import MainContent from '../core-components/main-content';
import Header from '../core-components/header';
import PainelList from '../core-components/painel-list';
import PainelFilter from '../core-components/painel-filter';
import PainelStatus from '../core-components/painel-status';
import PainelSearch from '../core-components/painel-search';
import { ShipmentProvider } from '../context/ShipmentContext';
import { useState } from "react";
import type { FilterType } from "../core-components/painel-filter";
import Card from '../components/card';

export default function App() {
  const [filter, setFilter] = useState<FilterType>("Todos");

  return (
    <>
      <Header />
      <MainContent className="flex gap-6 flex-col p-8">
        <ShipmentProvider>
          <PainelSearch />
        </ShipmentProvider>
        <ShipmentProvider>
          <PainelStatus />
        </ShipmentProvider>
        <Card size={'lg'}>
          <PainelFilter onFilterChange={setFilter} />
          <ShipmentProvider>
            <PainelList filter={filter} />
          </ShipmentProvider>
        </Card>
      </MainContent>
    </>
  );
}