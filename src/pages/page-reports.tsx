import { useState, useMemo } from "react";
import Card from "../components/card";
import Button from "../components/button";
import InputText from "../components/input";
import Text from "../components/text";
import { useShipments } from "../context/ShipmentContext";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import MainContent from "../core-components/main-content";
import Header from "../core-components/header";
import Container from "../components/container";

export default function ReportBuilderPage() {
  const { shipments } = useShipments();

  const [chartType, setChartType] = useState("line");
  const [fieldX, setFieldX] = useState("month");
  const [fieldY, setFieldY] = useState("count");
  const [reportName, setReportName] = useState("");

  const fieldXOptions = [
    { value: "month", label: "Mês" },
    { value: "origin", label: "Origem" },
    { value: "destination", label: "Destino" },
  ];

  const fieldYOptions = [
    { value: "count", label: "Quantidade" }
  ];
  
  const chartData = useMemo(() => {
    if (!shipments || shipments.length === 0) return [];

    const map: Record<string, number> = {};

    shipments.forEach((s) => {
      let key = "";

      switch (fieldX) {
        case "month":
          key = s.etd?.slice(0, 7) || "Sem data";
          break;
        case "origin":
          key = s.origem || "Sem origem";
          break;
        case "destination":
          key = s.destino || "Sem destino";
          break;
      }

      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map).map(([x, count]) => ({
      [fieldX]: x,
      [fieldY]: count
    }));
  }, [shipments, fieldX, fieldY]);

  const downloadExcel = () => {
    if (chartData.length === 0) return;

    const header = Object.keys(chartData[0]).join(",");
    const body = chartData.map((r) => Object.values(r).join(",")).join("\n");
    const csv = header + "\n" + body;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${reportName || "relatorio"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <MainContent className="p-6 grid gap-6 max-w-5xl mx-auto">
        <Card className="p-6" size={"md"}>
          <Text as="h1" variant="body-3xl" className="mb-4">
            Criar Relatório Personalizado
          </Text>
          <div className="grid gap-4">
            <InputText
              placeholder="Nome do relatório"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <Text variant="body-sm" as="label">Tipo de gráfico</Text>
                <select
                  className="border rounded p-2 text-sm outline-red-base"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <option value="line">Linha</option>
                  <option value="bar">Barra</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <Text variant="body-sm" as="label">Campo Eixo X</Text>
                <select
                  className="border rounded p-2 text-sm outline-red-base"
                  value={fieldX}
                  onChange={(e) => setFieldX(e.target.value)}
                >
                  {fieldXOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <Text variant="body-sm" as="label">Campo Eixo Y</Text>
                <select
                  className="border rounded p-2 text-sm outline-red-base"
                  value={fieldY}
                  onChange={(e) => setFieldY(e.target.value)}
                >
                  {fieldYOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6" size={"md"}>
          <Container as="header" className="flex justify-between item-center gap-4 mb-4">
            <Text variant="body-xl" as="h2">
              Pré-visualização
            </Text>
            <Button variant={"secondary"} onClick={downloadExcel}>
              Baixar Relatório em Excel
            </Button>
          </Container>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={fieldX} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey={fieldY} stroke="#CF0A2C" strokeWidth={2} />
                </LineChart>
              ) : ( 
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={fieldX} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey={fieldY} className="fill-red-base" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>
      </MainContent>
    </>
  );
}