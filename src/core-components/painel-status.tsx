import Card from '../components/card'
import Button from '../components/button'
import Text from '../components/text'
import PackIcon from "../assets/icons/pack.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import MapIcon from "../assets/icons/map.svg?react";
import CloseIcon from "../assets/icons/x.svg?react";
import ClockIcon from "../assets/icons/clock.svg?react";
import Icon from '../components/icon';
import { useShipments } from "../context/ShipmentContext";

export default function PainelStatus(){
  const { dateFilter, setDateFilter, statusCount } = useShipments()

  const btn = (label: string, value: any) => (
    <Button
      variant={dateFilter === value ? "secondary" : "primary"}
      onClick={() => setDateFilter(value)}
      className='px-0!'
    >
      {label}
    </Button>
  )

  return(
    <Card size={'md'}>
      <Text as='h2' variant={'body-xl'} className='mb-1'>Status</Text>
      <Text as='p'>Filtre entre os status e transportes.</Text>
      <div className='grid grid-cols-2 lg:flex lg:flex-row gap-3 my-4 [&>button]:flex-1'>
        {btn("Hoje", "Hoje")}
        {btn("Últimos 7 dias", "7")}
        {btn("Últimos 15 dias", "15")}
        {btn("Últimos 30 dias", "30")}
        {btn("Mês atual", "MesAtual")}
        {btn("Todos", "Todos")}
      </div>

      <div className='grid xl:flex grid-cols-2 gap-3 my-4 [&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div]:gap-1'>
        <Card size={'md'}>
          <Text variant={'body-sm'}>Total</Text>
          <Text variant={'body-xl'}>{statusCount.Total}</Text>
        </Card>

        <Card size={'md'}>
          <Text variant={'body-sm'} className='flex items-center gap-2.5'>
            <Icon svg={CheckIcon} className='fill-green-base' />
            Entregue
          </Text>
          <Text variant={'body-xl'} className='text-green-base'>
            {statusCount["Entregue"]}
          </Text>
        </Card>

        <Card size={'md'}>
          <Text variant={'body-sm'} className='flex items-center gap-2.5'>
            <Icon svg={MapIcon} className='fill-blue-base' />
            Em trânsito
          </Text>
          <Text variant={'body-xl'} className='text-blue-base'>
            {statusCount["Em trânsito"]}
          </Text>
        </Card>

        <Card size={'md'}>
          <Text variant={'body-sm'} className='flex items-center gap-2.5'>
            <Icon svg={PackIcon} className='fill-purple-base' />
            Preparando Envio
          </Text>
          <Text variant={'body-xl'} className='text-purple-base'>
            {statusCount["Preparando envio"]}
          </Text>
        </Card>

        <Card size={'md'}>
          <Text variant={'body-sm'} className='flex items-center gap-2.5'>
            <Icon svg={ClockIcon} className='fill-orange-base' />
            Aguardando
          </Text>
          <Text variant={'body-xl'} className='text-orange-base'>
            {statusCount["Aguardando"]}
          </Text>
        </Card>

        <Card size={'md'}>
          <Text variant={'body-sm'} className='flex items-center gap-2.5'>
            <Icon svg={CloseIcon} className='fill-red-base' />
            Cancelado
          </Text>
          <Text variant={'body-xl'} className='text-red-base'>
            {statusCount["Cancelado"]}
          </Text>
        </Card>
      </div>
    </Card>
  )
}