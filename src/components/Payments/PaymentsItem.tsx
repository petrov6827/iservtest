import { memo, useEffect, useMemo, type FC } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getChargesState } from '../../store/selectors/getCharges.ts';
import type { Subscr } from '../../types/charges';
import { fetchCharges, setFromMonth, setFromYear, setToMonth, setToYear } from './../../store/slices/chargesSlice';
import { months, years } from '../../const/date';
import { useAppDispatch } from '../../store/store.ts';
import ChargesTable from './ChargesTable.tsx';

interface PaymentsItemProps {
  subscr: Subscr;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expandedCharge: number | false;
  onChargeRowClick: (subscrId: number, chargeId: number) => void;
}

const PaymentsItem: FC<PaymentsItemProps> = ({ subscr, expanded, onChange, expandedCharge, onChargeRowClick }) => {
  const dispatch = useAppDispatch();
  const { fromMonth, fromYear, toMonth, toYear, charges } = useSelector(getChargesState);

  const fromPeriod = fromYear * 100 + fromMonth;
  const toPeriod = toYear * 100 + toMonth;

  const filteredCharges = useMemo(
    () => subscr.charges.filter(c => c.Period >= fromPeriod && c.Period <= toPeriod),
    [subscr.charges, fromPeriod, toPeriod]
  );

  useEffect(() => {
    dispatch(fetchCharges());
  }, [fromMonth, fromYear, toMonth, toYear, dispatch]);

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <Typography variant="subtitle1">{subscr.SubscrCode} — {subscr.FIO}</Typography>
          <Typography variant="body2" color="text.secondary">{subscr.Address}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box mb={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <Typography variant="body2">Период с:</Typography>
            </Grid>
            <Grid>
              <FormControl size="small">
                <InputLabel>Месяц</InputLabel>
                <Select
                  value={fromMonth}
                  label="Месяц"
                  onChange={e => dispatch(setFromMonth(Number(e.target.value)))}
                >
                  {months.map(m => (
                    <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl size="small">
                <InputLabel>Год</InputLabel>
                <Select
                  value={fromYear}
                  label="Год"
                  onChange={e => dispatch(setFromYear(Number(e.target.value)))}
                >
                  {years.map(y => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <Typography variant="body2">по:</Typography>
            </Grid>
            <Grid>
              <FormControl size="small">
                <InputLabel>Месяц</InputLabel>
                <Select
                  value={toMonth}
                  label="Месяц"
                  onChange={e => dispatch(setToMonth(Number(e.target.value)))}
                >
                  {months.map(m => (
                    <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl size="small">
                <InputLabel>Год</InputLabel>
                <Select
                  value={toYear}
                  label="Год"
                  onChange={e => dispatch(setToYear(Number(e.target.value)))}
                >
                  {years.map(y => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <ChargesTable
          subscr={{ ...subscr, charges: filteredCharges }}
          expandedCharge={expandedCharge}
          onChargeRowClick={onChargeRowClick}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(PaymentsItem); 