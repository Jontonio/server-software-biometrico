import moment from 'moment';
moment.locale('es');

export interface DayInfo {
  startDay: string;
  dayNumber: number;
  numberStartDay?:number;
}
export const days = [
  { name: 'lunes', code: 2 },
  { name: 'martes', code: 3 },
  { name: 'miércoles', code: 4 },
  { name: 'jueves', code: 5 },
  { name: 'viernes', code: 6 },
  { name: 'sábado', code: 7 },
  { name: 'domingo', code: 1 }
];

export const getDaysToMonth = (anio: number, mes: number): DayInfo[] => {

  const diasEnMes = moment(`${anio}-${mes}`, 'YYYY-MM').daysInMonth();

  const diasArray: DayInfo[] = [];

  for (let dia = 1; dia <= diasEnMes; dia++) {

    const fecha = moment(`${anio}-${mes}-${dia}`, 'YYYY-MM-DD');

    const startDay = fecha.format('dddd');

    if (startDay !== 'sábado' && startDay !== 'domingo') {
      const dayInfo: DayInfo = {
        startDay:startDay=='miércoles'?startDay.slice(0,2).toUpperCase():startDay.slice(0,1).toUpperCase(),
        dayNumber: dia,
        numberStartDay: days.find(day => day.name === startDay)?.code || 0,
      };
      diasArray.push(dayInfo);
    }

  }

  return diasArray;
}

export const transformArrayJustifications = (label: string, arr: any[]) => {
  
  const data = Array.from({ length: 12 }, () => 0);

  arr.forEach(value => {
    data[value.month - 1] = value.counter;
  });

  return { label, data };
};
