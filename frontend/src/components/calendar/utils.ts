import range from "lodash/range";
import getYear from "date-fns/getYear";

export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export const years = range(1920, getYear(new Date()) + 1, 1);

// получаем формат даты YYYY-MM-DD
export const getDatePadTo2Digits = (num: Date) => {
    return num?.toString().padStart(2, '0');
}

// проверяем является ли день выходным
export const isDayWeekend = (date: Date) => {
    return date.getDay() === 6 || date.getDay() === 0
}