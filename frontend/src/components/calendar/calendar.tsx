import { FC, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB"
import styles from "./calendar.module.css";
import { getDatePadTo2Digits, isDayWeekend, months, years } from "./utils";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { CalendarCustomInput } from "../calendarCustomInput/calendarCustomInput";

interface ICalendar{
    startDate: Date | null, 
    setStartDate: (value: Date | null) => void,
} 

export const Calendar:FC<ICalendar> = ({
    startDate,
    setStartDate
}) => {

    const dayClassNameFunction = (date: Date) => {
        // проверяем является ли дата текущей датой
        if(getDatePadTo2Digits(date) === getDatePadTo2Digits(startDate as Date)){
            return styles.currentDay
        }
        
        if(isDayWeekend(date)){
            return styles.dayWeekend
        }

        return styles.days
    }


    useEffect(() => {
        registerLocale("en-GB", enGB);
    }, []);

    return (
        <div className={styles.wrapper}>
        <DatePicker
            calendarClassName={styles.datepicker}
            className={styles.style}
            dayClassName={dayClassNameFunction}
            showPopperArrow={false}
            dateFormat="dd.MM.yyyy"
            locale={'en-GB'}
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
            shouldCloseOnSelect={false}
            formatWeekDay={() => ""}
            customInput={<CalendarCustomInput />}
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
            }) => (
                <div
                    className={styles.container}
                >
                    <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(Number(value))}
                        className={styles.select}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                       
                    </select>

                    <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                        className={styles.select}
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        />
        </div>
    )
}