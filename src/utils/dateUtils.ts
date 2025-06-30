import dayjs from 'dayjs';

export const getInitialPeriod = () => {
	const now = dayjs();
	return {
		start: now.subtract(5, 'month'),
		end: now
	};
};

export const formatPeriodForAPI = (
	fromMonth: number, 
	fromYear: number, 
	toMonth: number, 
	toYear: number
) => {
	return {
		PeriodBegin: `${fromYear}${fromMonth.toString().padStart(2, '0')}`,
		PeriodEnd: `${toYear}${toMonth.toString().padStart(2, '0')}`
	};
};

export const getYearsList = (yearsCount: number) => {
	const current = dayjs().year();
	return Array.from({ length: yearsCount }, (_, i) => {
		return current - i;
	});
};