import dynamic from "next/dynamic";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

import {
  Container,
  Title,
} from "./styles";

const options = {
  //colors:['#028ffa', '#F5A02E'],

  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#d5d5d5',
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
    
  },

};


//series sao os tipos de dados
const series = [
  { name: 'Recebido R$', data: [1000, 2000, 3000, 4000, 2000, 6000, 7000, 7500] },
  { name: 'Gasto R$', data:[500, 1000, 1500, 2000, 4000, 3000, 3500, 3600]}
]


export default function ApexChart() {
  return (
    <Container>
      <Title>Valores recebidos  x  Valores gastos</Title>
      <Chart
        options={options}
        series={series}
        type="area"
        height={330}
        width={'100%'}
      />
    </Container>
  );
}