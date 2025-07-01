import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { fetchSubscrs } from '../../store/slices/subscrsSlice';
import { getSubscrs } from '../../store/selectors/getSubscrs';
import PaymentsItem from './PaymentsItem';

const PaymentsList = () => {
  const dispatch = useAppDispatch();
  const [expandedSubscr, setExpandedSubscr] = useState<number | null>();
  const [expandedCharge, setExpandedCharge] = useState<{ [key: number]: number | false }>({});
  const { subscrs, loading } = useSelector(getSubscrs);

  const handleSubscrChange = useCallback((subscrId: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSubscr(isExpanded ? subscrId : null)
  }, []);

  const handleChargeRowClick = useCallback((subscrId: number, chargeId: number) => {
    setExpandedCharge((prev) => ({
      ...prev,
      [subscrId]: prev[subscrId] === chargeId ? false : chargeId
    }))
  }, []);

  useEffect(() => {
    dispatch(fetchSubscrs());
  }, [dispatch])

  const paymentsItems = useMemo(
    () =>
      subscrs.map((subscr) => {
        const { SubscrId } = subscr;
        return (
          <PaymentsItem
            key={SubscrId}
            subscr={subscr}
            expanded={expandedSubscr === SubscrId}
            onChange={handleSubscrChange(SubscrId)}
            expandedCharge={expandedCharge[SubscrId]}
            onChargeRowClick={handleChargeRowClick}
          />
        );
      }),
    [subscrs, expandedSubscr, handleSubscrChange, expandedCharge, handleChargeRowClick]
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>Начисления</Typography>
      {loading && <CircularProgress />}
      {paymentsItems}
    </>
  );
};

export default PaymentsList;