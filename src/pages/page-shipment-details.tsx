import { useParams, useNavigate } from "react-router-dom";
import { useShipments } from "../context/ShipmentContext";
import Header from "../core-components/header";
import MainContent from "../core-components/main-content";
import Icon from "../components/icon";
import Text from "../components/text";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import MapColoredIcon from "../assets/icons/pin.svg?react";
import Arrow from "../assets/icons/arrow.svg?react";
import Card from "../components/card";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Button from "../components/button";
import Container from "../components/container";

// Ajuste de ícone do Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function PageShipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipments } = useShipments();
  const shipment = shipments.find((s) => s.id === id);

  if (!shipment) {
    return (
      <>
        <Header />
        <MainContent className="p-8">
          <Text variant="body-xl">Embarque não encontrado.</Text>
        </MainContent>
      </>
    );
  }

  const origem = shipment.origemLat && shipment.origemLng
    ? [shipment.origemLat, shipment.origemLng] as [number, number]
    : null;

  const destino = shipment.destinoLat && shipment.destinoLng
    ? [shipment.destinoLat, shipment.destinoLng] as [number, number]
    : null;

  // const routePoints = origem && destino ? [origem, destino] : [];

  return (
    <>
      <Header />
      <MainContent className="flex flex-col gap-6 p-8">
        <Card as="header" size="lg" className="flex flex-col gap-4 sm:flex-row item-center justify-between">
          <Container className="flex flex-col gap-2 mx-0!">
            <div className="flex item-center gap-2">
              <Text variant="body-3xl">{shipment.id}</Text>
              <Text
                variant="body-sm-bold"
                className={`
                  rounded-xl border px-2
                  ${shipment.status === "Entregue" ? 
                    "text-green-base bg-green-ultra-light border-green-light" :
                    shipment.status === "Em trânsito" ?
                    "text-blue-base bg-blue-ultra-light border-blue-light" :
                    shipment.status === "Aguardando" ?
                    "text-yellow-base bg-yellow-ultra-light border-yellow-light" :
                    "text-gray-400 bg-gray-200 border-gray-300"
                  }
                `}
              >
                {shipment.status}
              </Text>
            </div>
            <Text variant="body-md-bold">{shipment.origem}</Text>
          </Container>
          <Button icon={Arrow} onClick={() => navigate(-1)} variant={"secondary"}>Voltar</Button>
        </Card>

        <Card size={"md"} className="flex justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <Icon svg={CalendarIcon} size="sm" />
              <dl>
                <dt><Text variant="body-sm">ETD</Text></dt>
                <dd><Text variant="body-sm-bold">{shipment.etd}</Text></dd>
              </dl>
            </div>
            <div className="flex items-start gap-2">
              <Icon svg={MapColoredIcon} size="sm" />
              <dl>
                <dt><Text variant="body-sm">Origem</Text></dt>
                <dd><Text variant="body-sm-bold">{shipment.origem}</Text></dd>
              </dl>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <Icon svg={CalendarIcon} size="sm" />
              <dl>
                <dt><Text variant="body-sm">ETA</Text></dt>
                <dd><Text variant="body-sm-bold">{shipment.eta}</Text></dd>
              </dl>
            </div>
            <div className="flex items-start gap-2">
              <Icon svg={MapColoredIcon} size="sm" />
              <dl>
                <dt><Text variant="body-sm">Destino</Text></dt>
                <dd><Text variant="body-sm-bold">{shipment.destino}</Text></dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card size={"md"}>
          <Text variant={"body-xl"} as="h2" className="mb-3.5">Linha do tempo</Text>
          <section className="flex flex-col gap-1">
            <div className="flex justify-between gap-6">
              <Text variant="body-md">Progresso</Text>
              <Text variant="body-md-bold">{shipment.progresso}%</Text>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-1">
              <div
                className="bg-gray-400 h-1 rounded-full"
                style={{ width: `${shipment.progresso}%` }}
              />
            </div>
          </section>
        </Card>

        <Card className="p-4">
          <div className="rounded-lg overflow-hidden">
            <MapContainer
              center={origem ?? [0, 0]}
              zoom={4}
              style={{ height: "260px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {origem && (
                <Marker
                  position={origem}
                  eventHandlers={{
                    add: (marker) => marker.target.openPopup()
                  }}
                >
                  <Popup closeOnClick={false} autoPan={false}>
                    Origem: {shipment.origem} | {shipment.etd}
                  </Popup>
                </Marker>
              )}
              {destino && (
                <Marker
                  position={destino}
                  eventHandlers={{
                    add: (marker) => marker.target.openPopup()
                  }}
                >
                  <Popup closeOnClick={false} autoPan={false}>
                    Destino: {shipment.destino} | {shipment.eta}
                  </Popup>
                </Marker>
              )}
              {/* {routePoints.length === 2 && (
                <Polyline positions={routePoints} />
              )} */}
            </MapContainer>
          </div>
        </Card>

      </MainContent>
    </>
  );
}