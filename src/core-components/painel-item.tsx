import Card from '../components/card'
import Text from '../components/text'
import Icon from '../components/icon'
import CalendarIcon from "../assets/icons/calendar.svg?react"
import MapColoredIcon from "../assets/icons/pin.svg?react"
import type { Shipment } from '../context/ShipmentContext'
import { useNavigate } from "react-router-dom";

type Props = {
  item: Shipment;
  viewMode: "grid" | "list";
};

export default function PainelItem({ item, viewMode }: Props) {
  const navigate = useNavigate();
  return (
    <Card as="article" size="md" onClick={() => navigate(`/embarque/${item.id}`)} className='cursor-pointer hover:shadow-md transition'>
      <header className={`flex justify-between items-center ${viewMode === "list" ? "mb-2" : "mb-6"}`}>
        <div className="flex flex-col">
          <Text variant="body-sm-bold">{item.id}</Text>
          <Text variant="body-sm">{item.origem}</Text>
        </div>
        <Text
          variant="body-sm-bold"
          className={`
            rounded-xl border px-2
            ${item.status === "Entregue" ? 
              "text-green-base bg-green-ultra-light border-green-light" :
              item.status === "Em trânsito" ?
              "text-blue-base bg-blue-ultra-light border-blue-light" :
              item.status === "Aguardando" ?
              "text-yellow-base bg-yellow-ultra-light border-yellow-light" :
              "text-gray-400 bg-gray-200 border-gray-300"
            }
          `}
        >
          {item.status}
        </Text>
      </header>
      <section className={`flex flex-col gap-1 ${viewMode === "list" ? "mb-4" : "mb-6"}`}>
        <div className="flex justify-between gap-6">
          <Text variant="body-sm">Progresso</Text>
          <Text variant="body-sm-bold">{item.progresso}%</Text>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-1">
          <div
            className="bg-gray-400 h-1 rounded-full"
            style={{ width: `${item.progresso}%` }}
          />
        </div>
      </section>
      <section className="flex justify-between gap-4">
        <div className={`flex flex-col ${viewMode === "list" ? "md:grid md:grid-cols-2 md:gap-2" : "gap-8"}`}>
          <div className="flex items-start gap-1">
            <Icon svg={CalendarIcon} size="sm" />
            <dl className={`${viewMode === "list" ? "md:flex md:items-center md:gap-2" : ""}`}>
              <dt><Text variant="body-sm">ETD</Text></dt>
              <dd><Text variant="body-sm-bold">{item.etd}</Text></dd>
            </dl>
          </div>
          <div className="flex items-start gap-1">
            <Icon svg={MapColoredIcon} size="sm" />
            <dl className={`${viewMode === "list" ? "md:flex md:items-center md:gap-2" : ""}`}>
              <dt><Text variant="body-sm">Origem</Text></dt>
              <dd><Text variant="body-sm-bold">{item.origem}</Text></dd>
            </dl>
          </div>
        </div>
        <div className={`flex flex-col ${viewMode === "list" ? "md:grid md:grid-cols-2 md:gap-2" : "gap-8"}`}>
          <div className="flex items-start gap-1">
            <Icon svg={CalendarIcon} size="sm" />
            <dl className={`${viewMode === "list" ? "md:flex md:items-center md:gap-2" : ""}`}>
              <dt><Text variant="body-sm">ETA</Text></dt>
              <dd><Text variant="body-sm-bold">{item.eta}</Text></dd>
            </dl>
          </div>
          <div className="flex items-start gap-1">
            <Icon svg={MapColoredIcon} size="sm" />
            <dl className={`${viewMode === "list" ? "md:flex md:items-center md:gap-2" : ""}`}>
              <dt><Text variant="body-sm">Destino</Text></dt>
              <dd><Text variant="body-sm-bold">{item.destino}</Text></dd>
            </dl>
          </div>
        </div>
      </section>
    </Card>
  )
}