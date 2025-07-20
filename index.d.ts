import { ReactNode } from 'react';

export interface HebrewDatePickerProps {
    /** The name attribute for the input field */
    name: string;

    /** The current value as ISO date string (YYYY-MM-DD) */
    value?: string;

    /** Callback function called when date changes */
    onChange?: (event: { target: { name: string; value: string } }) => void;

    /** Whether the field is required */
    required?: boolean;

    /** Label text for the input field */
    label?: string;

    /** Whether to render the calendar popup using React Portal */
    usePortal?: boolean;
}

export interface CalendarPopupProps {
    /** Ref to the popup container */
    popupRef: React.RefObject<HTMLDivElement>;

    /** Position of the calendar popup */
    calendarPos: { top: number | string; left: number | string };

    /** Currently displayed Hebrew date */
    currentHDate: any; // HDate from @hebcal/core

    /** Selected Hebrew date */
    selectedHDate: any; // HDate from @hebcal/core

    /** Callback function called when date changes */
    onChange?: (event: { target: { name: string; value: string } }) => void;

    /** Function to close the calendar */
    setShowCalendar: (show: boolean) => void;

    /** Function to update current displayed date */
    setCurrentHDate: (date: any) => void;

    /** Whether month/year picker is shown */
    showMonthYearPicker: boolean;

    /** Function to toggle month/year picker */
    setShowMonthYearPicker: (show: boolean | ((prev: boolean) => boolean)) => void;

    /** Direction of transition animation */
    transitionDirection: 'forward' | 'backward';

    /** Function to set transition direction */
    setTransitionDirection: (direction: 'forward' | 'backward') => void;

    /** The name attribute for the input field */
    name: string;
}

declare const HebrewDatePicker: React.FC<HebrewDatePickerProps>;
declare const CalendarPopup: React.FC<CalendarPopupProps>;

export { CalendarPopup };
export default HebrewDatePicker;
