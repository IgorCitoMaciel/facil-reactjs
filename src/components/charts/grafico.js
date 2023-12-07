import { Chart } from 'react-google-charts'; 


export const data = [
  ["Bariri", "Contas a pagar", "Conta a rececer", "Lucro/Prejuízo"],
  ["Banco  A", 2000, 1400, 600],
  ["Banco  B", 1170, 460, 250],
  ["Banco  C", 660, 1120, 300],
  ["Banco  D", 1030, 540, 350],
];

export const options = {
  chart: {
    //title: "Centro de custo",
    //subtitle: "Contas a pagar, Conta a rececer, Lucro/Prejuízo",
  },
};

export function GraficoTeste() {
  return (
    <Chart
      chartType="Bar"
      width="600px"
      height="400px"
      data={data}
      options={options}
      style={{
        display:'flex',
        alignItems:"center",
        justifyContent:"center",
      }}
    />
  );
}