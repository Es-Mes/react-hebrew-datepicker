export interface HebrewDatePickerProps {
    /** The name attribute for the input field */
    name: string;

    /** The current value as ISO date string (YYYY-MM-DD) */
    value?: string;

    /** Initial value as ISO date string (YYYY-MM-DD) — uncontrolled mode */
    defaultValue?: string;

    /** Callback function called when date changes */
    onChange?: (event: { target: { name: string; value: string } }) => void;

    /** Whether the field is required */
    required?: boolean;

    /** Label text. Pass null to hide the built-in label (e.g. when a form already renders one). */
    label?: string | null;

    /** Whether the field is disabled and cannot open the calendar */
    disabled?: boolean;

    /** Override built-in UI strings. Unspecified keys keep the Hebrew defaults. */
    labels?: DatePickerLabels;

    /** Inclusive minimum selectable date as ISO YYYY-MM-DD */
    minDate?: string;

    /** Inclusive maximum selectable date as ISO YYYY-MM-DD */
    maxDate?: string;

    /** Return true to block a specific ISO date in the calendar */
    isDateDisabled?: (isoDate: string) => boolean;

    /** Whether to render the calendar popup using React Portal */
    usePortal?: boolean;

    /** Text direction for this picker only, not the whole page */
    dir?: 'rtl' | 'ltr';

    /** Extra class on the field wrapper */
    className?: string;

    /** Extra class on the calendar popup */
    popupClassName?: string;
}

export interface DatePickerLabels {
    placeholder?: string;
    today?: string;
    clear?: string;
    nextMonth?: string;
    prevMonth?: string;
}

export interface CalendarPopupProps {
    /** Ref to the popup container */
    popupRef: React.RefObject<HTMLDivElement>;

    /** Position of the calendar popup */
    calendarPos: { top?: number | string; bottom?: number | string; left?: number | string };

    popupClassName?: string;
    themeStyle?: React.CSSProperties;

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

    /** Resolved UI strings */
    labels?: DatePickerLabels;

    minDate?: string;
    maxDate?: string;
    isDateDisabled?: (isoDate: string) => boolean;
}

declare const HebrewDatePicker: React.FC<HebrewDatePickerProps>;
declare const CalendarPopup: React.FC<CalendarPopupProps>;

export { CalendarPopup };
export default HebrewDatePicker;
