import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import type { ChargeDetail } from '../../types/charges';

interface ChargeDetailsTableProps {
  details: ChargeDetail[];
}

const ChargeDetailsTable = ({ details }: ChargeDetailsTableProps) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Группа</TableCell>
        <TableCell>Услуга</TableCell>
        <TableCell align="right">Объем</TableCell>
        <TableCell align="right">Тариф</TableCell>
        <TableCell>Ед.</TableCell>
        <TableCell align="right">Всего начислено</TableCell>
        <TableCell align="right">Начислено</TableCell>
        <TableCell align="right">Перерасчет</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {details.map((detail) => {

        const {
          ChargeDetailId,
          GroupName,
          Name,
          Quantity,
          Tariff,
          UnitName,
          Total,
          Amount,
          Recalc
        } = detail

        return (
          <TableRow key={ChargeDetailId}>
            <TableCell>{GroupName}</TableCell>
            <TableCell>{Name}</TableCell>
            <TableCell align="right">{Quantity}</TableCell>
            <TableCell align="right">{Tariff}</TableCell>
            <TableCell>{UnitName}</TableCell>
            <TableCell align="right">{Total}</TableCell>
            <TableCell align="right">{Amount}</TableCell>
            <TableCell align="right">{Recalc}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  </Table>
);

export default ChargeDetailsTable; 