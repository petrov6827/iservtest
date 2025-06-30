import dayjs from 'dayjs';

export const MONTHS = [
	'Январь', 'Февраль', 'Март', 'Апрель',
	'Май', 'Июнь', 'Июль', 'Август',
	'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
] as const;

export const YEARS = Array.from(
	{ length: 9 },
	(_, i) => 2017 + i
);

export type Month = typeof MONTHS[number];
export type Year = typeof YEARS[number];

export const formatPeriod = (period: number): string => {
	if (!period || period.toString().length !== 6) {
		throw new Error('Invalid period format. Expected YYYYMM');
	}
	
	const year = Math.floor(period / 100);
	const month = period % 100 - 1;
	
	if (month < 0 || month > 11) {
		throw new Error('Invalid month in period');
	}
	
	return `${MONTHS[month]} ${year}`;
};

export const createPeriod = (year: number, month: number): number => {
	if (year < 2000 || year > 2100) {
		throw new Error('Invalid year');
	}
	
	if (month < 1 || month > 12) {
		throw new Error('Invalid month');
	}
	
	return year * 100 + month;
};

export const isPeriodInRange = (
	period: number,
	fromYear: number,
	fromMonth: number,
	toYear: number,
	toMonth: number
): boolean => {
	const fromPeriod = createPeriod(fromYear, fromMonth);
	const toPeriod = createPeriod(toYear, toMonth);
	
	return period >= fromPeriod && period <= toPeriod;
};

export const getCurrentPeriod = (): number => {
	const now = dayjs();
	return createPeriod(now.year(), now.month() + 1);
};

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