import { memo, type FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { Subscr } from '../../types/charges';
import { formatAmount } from '../../utils/amountUtils';
import ChargeDetailsTable from './ChargeDetailsTable';

interface ChargesTableProps {
  subscr: Subscr;
  expandedCharge: number | false;
  onChargeRowClick: (subscrId: number, chargeId: number) => void;
}

const ChargesTable: FC<ChargesTableProps> = ({ subscr, expandedCharge, onChargeRowClick }) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Период</TableCell>
          <TableCell align="right">К оплате на начало месяца</TableCell>
          <TableCell align="right">Начислено</TableCell>
          <TableCell align="right">Оплачено</TableCell>
          <TableCell align="right">К оплате</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subscr.charges.map(({
          ChargeId,
          PeriodName,
          DebtByBeginMonth,
          Amount,
          Payment,
          AmountToPay,
          ChargeDetails
        }) => (
            <>
              <TableRow key={ChargeId} hover>
                <TableCell>
                  <IconButton size="small" onClick={() => onChargeRowClick(subscr.SubscrId, ChargeId)}>
                    {expandedCharge === ChargeId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{PeriodName}</TableCell>
                <TableCell align="right">{formatAmount(DebtByBeginMonth)}</TableCell>
                <TableCell align="right">{formatAmount(Amount)}</TableCell>
                <TableCell align="right">{formatAmount(Payment)}</TableCell>
                <TableCell align="right">{formatAmount(AmountToPay)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={expandedCharge === ChargeId} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="subtitle2" gutterBottom component="div">
                        Детализация начисления
                      </Typography>
                      <ChargeDetailsTable details={ChargeDetails} />
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default memo(ChargesTable); 