import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchSubscrs } from '../../store/slices/subscrsSlice';
import { getSubscrs } from '../../store/selectors/getSubscrs';
import { USER_LOCALSTORAGE_KEY } from '../../const/localStorage';
import PaymentsItem from './PaymentsItem';
import { useAppDispatch } from '../../store/store';
import { subscrsMock } from '../../mock/subscrMock';

const PaymentsList = () => {
	const dispatch = useAppDispatch();
	const [expandedSubscr, setExpandedSubscr] = useState<number | false>(false);
	const [expandedCharge, setExpandedCharge] = useState<{ [key: number]: number | false }>({});
	const { subscrs, loading, error } = useSelector(getSubscrs);

	const handleSubscrChange = (subscrId: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpandedSubscr(isExpanded ? subscrId : false);
	};

	const handleChargeRowClick = (subscrId: number, chargeId: number) => {
		setExpandedCharge((prev) => ({
			...prev,
			[subscrId]: prev[subscrId] === chargeId ? false : chargeId
		}));
	};

	useEffect(() => {
		localStorage.setItem(USER_LOCALSTORAGE_KEY, '1750857636577577385') //запись в локал сторадж если авторизован
		dispatch(fetchSubscrs());
	},[])

	return (
		<>
			<Typography variant="h6" gutterBottom>Начисления</Typography>
			{loading && <div>Загрузка...</div>}
			{/* {subscrs.map((subscr) => { */}
			{subscrsMock.map((subscr) => {
				const {SubscrId} = subscr
				return (
					<PaymentsItem
						key={SubscrId}
						subscr={subscr}
						expanded={expandedSubscr === SubscrId}
						onChange={handleSubscrChange(SubscrId)}
						expandedCharge={expandedCharge[SubscrId]}
						onChargeRowClick={handleChargeRowClick}
					/>
				)
			})}
		</>
	);
};

export default PaymentsList;