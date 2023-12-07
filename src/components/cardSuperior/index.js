import { FiTrendingDown, FiTrendingUp, FiDollarSign } from 'react-icons/fi'
import {
  Container,
  Card,
  CardContent,
  CardTitle,
  CardSubTitle,
} from "./styles";

export default function CardSuperior() {
  return (
    <Container>
      <Card>
        <CardContent>
          <CardTitle>R$ 30.000,00</CardTitle>
          <FiTrendingUp color='#9f9f9f' size={35} />
        </CardContent>
        <CardSubTitle>Total Recebido</CardSubTitle>
      </Card>


      <Card>
        <CardContent>
          <CardTitle>R$ 10.000,00</CardTitle>
          <FiTrendingDown color='#9f9f9f' size={35} />
        </CardContent>
        <CardSubTitle>Total Gasto</CardSubTitle>
      </Card>


      <Card>
        <CardContent>
          <CardTitle>R$ 20.000,00</CardTitle>
          <FiDollarSign color='#9f9f9f' size={35} />
        </CardContent>
        <CardSubTitle>Saldo</CardSubTitle>
      </Card>

    </Container>
  );
}