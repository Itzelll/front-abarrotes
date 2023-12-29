import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateChange = date => {
        setSelectedDate(date);
        closeCalendar();
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const closeCalendar = () => {
        setIsCalendarOpen(false);
    };

    return (
        <div>
            <div onClick={toggleCalendar}>
                <DatePicker
                    className="fecha-entrega"
                    placeholderText="Fecha de entrega"
                    selected={selectedDate}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleDateChange}
                    onClickOutside={closeCalendar}
                />
            </div>
        </div>
    );
};

export default Calendar;