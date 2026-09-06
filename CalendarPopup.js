// CalendarPopup.jsx
import React, { useEffect, useRef, useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { HDate } from "@hebcal/core";
import './HebrewDatePicker.css';

const hebrewMonths = [
    "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול",
    "תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר א׳", "אדר ב׳"
];

const daysOfWeek = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

const DEFAULT_GREGORIAN_MONTHS = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
];

const hebrewNumber = (num) => {
    const hebrewDigits = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י"];
    const tens = ["", "י", "כ", "ל"];
    if (num === 15) return "טו";
    if (num === 16) return "טז";
    if (num <= 10) return hebrewDigits[num];
    if (num < 20) return "י" + hebrewDigits[num - 10];
    if (num <= 30) {
        const ten = Math.floor(num / 10);
        const unit = num % 10;
        return tens[ten] + hebrewDigits[unit];
    }
    return num;
};

const hebrewDayToIso = (day, month, year) => {
    const hdate = new HDate(day + 1, month, year);
    return hdate.greg().toISOString().slice(0, 10);
};

const isIsoDisabled = (iso, minDate, maxDate, isDateDisabled) => {
    if (!iso) return false;
    if (minDate && iso < minDate) return true;
    if (maxDate && iso > maxDate) return true;
    if (isDateDisabled?.(iso)) return true;
    return false;
};

const hebrewYearFromIso = (iso) => new HDate(new Date(`${iso}T12:00:00`)).getFullYear();

const getSelectableYears = (currentYear, minDate, maxDate) => {
    if (!minDate && !maxDate) {
        return Array.from({ length: 60 }, (_, i) => currentYear - 30 + i);
    }
    const minYear = minDate ? hebrewYearFromIso(minDate) : currentYear - 30;
    const maxYear = maxDate ? hebrewYearFromIso(maxDate) : currentYear + 30;
    const years = [];
    for (let year = minYear; year <= maxYear; year++) {
        years.push(year);
    }
    return years;
};

const gregorianYearFromIso = (iso) => new Date(`${iso}T12:00:00`).getFullYear();

const getSelectableGregorianYears = (currentYear, minDate, maxDate) => {
    if (!minDate && !maxDate) {
        return Array.from({ length: 60 }, (_, i) => currentYear - 30 + i);
    }
    const minYear = minDate ? gregorianYearFromIso(minDate) : currentYear - 30;
    const maxYear = maxDate ? gregorianYearFromIso(maxDate) : currentYear + 30;
    const years = [];
    for (let year = minYear; year <= maxYear; year++) {
        years.push(year);
    }
    return years;
};

const gregorianDateForHebrewDay = (day, month, year) => (
    new HDate(day, month, year).greg()
);

const formatGregorianBarLabel = (hdate, monthNames) => {
    const daysInMonth = hdate.daysInMonth();
    const firstGreg = new HDate(1, hdate.getMonth(), hdate.getFullYear()).greg();
    const lastGreg = new HDate(daysInMonth, hdate.getMonth(), hdate.getFullYear()).greg();
    const startName = monthNames[firstGreg.getMonth()];
    const endName = monthNames[lastGreg.getMonth()];
    const startYear = firstGreg.getFullYear();
    const endYear = lastGreg.getFullYear();
    if (firstGreg.getMonth() === lastGreg.getMonth() && startYear === endYear) {
        return `${startName} ${startYear}`;
    }
    if (startYear === endYear) {
        return `${startName}–${endName} ${startYear}`;
    }
    return `${startName} ${startYear}–${endName} ${endYear}`;
};

const addHebrewMonths = (hdate, offset) => {
    let month = hdate.getMonth();
    let year = hdate.getFullYear();
    for (let i = 0; i < Math.abs(offset); i++) {
        if (offset > 0) {
            month++;
            if (month === 7) year++;
            if (month > 13 || (!hdate.isLeapYear() && month > 12)) month = 1;
        } else {
            month--;
            if (month < 1) month = hdate.isLeapYear() ? 13 : 12;
            if (month === 6) year--;
        }
    }
    return new HDate(1, month, year);
};

const CalendarPopup = ({
    popupRef,
    calendarPos,
    currentHDate,
    selectedHDate,
    onChange,
    setShowCalendar,
    setCurrentHDate,
    showMonthYearPicker,
    setShowMonthYearPicker,
    transitionDirection,
    setTransitionDirection,
    name,
    labels = {},
    minDate,
    maxDate,
    isDateDisabled,
    popupClassName,
    themeStyle,
    showGregorian = false,
}) => {
    const yearScrollRef = useRef(null);
    const gregorianYearScrollRef = useRef(null);
    const [showGregorianPicker, setShowGregorianPicker] = useState(false);
    const gregorianMonths = labels.gregorianMonths?.length === 12
        ? labels.gregorianMonths
        : DEFAULT_GREGORIAN_MONTHS;

    // Auto-scroll to current year when year picker opens
    useEffect(() => {
        if (showMonthYearPicker && yearScrollRef.current) {
            const currentYearElement = yearScrollRef.current.querySelector(`[data-year="${currentHDate.getFullYear()}"]`);
            if (currentYearElement) {
                setTimeout(() => {
                    currentYearElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }, 50);
            }
        }
    }, [showMonthYearPicker, currentHDate]);

    useEffect(() => {
        if (showGregorianPicker && gregorianYearScrollRef.current) {
            const focusDate = gregorianDateForHebrewDay(1, currentHDate.getMonth(), currentHDate.getFullYear());
            const currentYearElement = gregorianYearScrollRef.current.querySelector(`[data-year="${focusDate.getFullYear()}"]`);
            if (currentYearElement) {
                setTimeout(() => {
                    currentYearElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }, 50);
            }
        }
    }, [showGregorianPicker, currentHDate]);

    const firstOfMonth = new HDate(1, currentHDate.getMonth(), currentHDate.getFullYear());
    const firstWeekday = firstOfMonth.getDay();
    const daysInMonth = currentHDate.daysInMonth();

    const daysArray = Array(firstWeekday).fill(null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    const handleSelect = (day) => {
        if (!day) return;
        const iso = hebrewDayToIso(day, currentHDate.getMonth(), currentHDate.getFullYear());
        if (isIsoDisabled(iso, minDate, maxDate, isDateDisabled)) return;
        onChange?.({ target: { name, value: iso } });
        setShowCalendar(false);
    };

    const todayIso = new HDate().greg().toISOString().slice(0, 10);
    const todayBlocked = isIsoDisabled(todayIso, minDate, maxDate, isDateDisabled);
    const selectableYears = getSelectableYears(currentHDate.getFullYear(), minDate, maxDate);
    const focusGregorian = gregorianDateForHebrewDay(1, currentHDate.getMonth(), currentHDate.getFullYear());
    const selectableGregorianYears = getSelectableGregorianYears(focusGregorian.getFullYear(), minDate, maxDate);
    const gregorianBarLabel = formatGregorianBarLabel(currentHDate, gregorianMonths);

    const openHebrewPicker = () => {
        setShowGregorianPicker(false);
        setShowMonthYearPicker((prev) => !prev);
    };

    const openGregorianPicker = () => {
        setShowMonthYearPicker(false);
        setShowGregorianPicker((prev) => !prev);
    };

    const jumpToGregorianMonth = (monthIndex, year) => {
        setCurrentHDate(new HDate(new Date(year, monthIndex, 1, 12)));
        setShowGregorianPicker(false);
    };

    return (
        <>
            <div style={{ position: "fixed", inset: 0, zIndex: 3000 }} onClick={() => setShowCalendar(false)} />
            <div
                ref={popupRef}
                className={["rhdp-popup", "calendar-popup", popupClassName].filter(Boolean).join(" ")}
                style={{
                    position: "absolute",
                    top: calendarPos.top,
                    bottom: calendarPos.bottom,
                    left: calendarPos.left,
                    backgroundColor: "var(--rhdp-surface, white)",
                    borderRadius: "var(--rhdp-radius, 12px)",
                    boxShadow: "var(--rhdp-shadow, 0 4px 15px rgba(0,0,0,0.3))",
                    padding: 16,
                    width: showGregorian ? 368 : 320,
                    maxHeight: "min(90vh, 520px)",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    fontFamily: "var(--rhdp-font, Arial, sans-serif)",
                    zIndex: 10000,
                    ...themeStyle,
                }}
            >
                <div style={{ marginBottom: 10, borderBottom: "1px solid var(--rhdp-divider, #eee)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3
                        style={{ margin: 0, fontSize: 16, color: "var(--rhdp-primary, #4da6ff)", cursor: "pointer" }}
                        onClick={openHebrewPicker}
                    >
                        {hebrewMonths[currentHDate.getMonth() - 1]} {new HDate(1, currentHDate.getMonth(), currentHDate.getFullYear()).renderGematriya().split(" ").pop()}
                        <FaCaretDown />
                    </h3>
                    <div style={{ display: "flex", gap: 6 }}>
                        <button
                            type="button"
                            className="arrowBtn icon-tooltip"
                            onClick={() => {
                                setTransitionDirection("forward");
                                setCurrentHDate(addHebrewMonths(currentHDate, 1));
                            }}
                            style={{
                                background: "transparent",
                                border: "none",
                                fontSize: 18,
                                cursor: "pointer",
                                color: "var(--rhdp-primary, #4da6ff)",
                                padding: "8px"
                            }}
                        >
                            <IoArrowDown />
                            <span className="tooltip-text next">
                                {labels.nextMonth || "חודש הבא"}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="arrowBtn icon-tooltip"
                            onClick={() => {
                                setTransitionDirection("backward");
                                setCurrentHDate(addHebrewMonths(currentHDate, -1));
                            }}
                            style={{
                                background: "transparent",
                                border: "none",
                                fontSize: 18,
                                cursor: "pointer",
                                color: "var(--rhdp-primary, #4da6ff)",
                                padding: "8px"
                            }}
                        >
                            <IoArrowUp />
                            <span className="tooltip-text prev">
                                {labels.prevMonth || "חודש קודם"}
                            </span>
                        </button>
                    </div>
                </div>
                {showGregorian && (
                    <button
                        type="button"
                        className="rhdp-gregorian-bar"
                        onClick={openGregorianPicker}
                    >
                        {gregorianBarLabel}
                        <FaCaretDown />
                    </button>
                )}
                </div>

                <div className="rhdp-calendar-body">
                {showMonthYearPicker && (
                    <div className="month-year-picker rhdp-month-year-overlay">
                        <div className="rhdp-month-year-column" style={{ direction: "rtl" }}>
                            {hebrewMonths.map((monthName, i) => (
                                <div
                                    key={i + 1}
                                    className="rhdp-picker-item"
                                    onClick={() => {
                                        setCurrentHDate(new HDate(1, i + 1, currentHDate.getFullYear()));
                                        setShowMonthYearPicker(false);
                                    }}
                                    style={{
                                        padding: 6,
                                        cursor: "pointer",
                                        color: currentHDate.getMonth() === i + 1 ? "var(--rhdp-on-primary, white)" : "var(--rhdp-muted, #333)",
                                        backgroundColor: currentHDate.getMonth() === i + 1 ? "var(--rhdp-primary, #4da6ff)" : "transparent",
                                        borderRadius: 6
                                    }}
                                >
                                    {monthName}
                                </div>
                            ))}
                        </div>
                        <div
                            ref={yearScrollRef}
                            className="rhdp-month-year-column"
                            style={{ direction: "rtl" }}
                        >
                            {selectableYears.map((year) => {
                                const label = new HDate(1, 1, year).renderGematriya().split(" ").pop();
                                return (
                                    <div
                                        key={year}
                                        data-year={year}
                                        className="rhdp-picker-item"
                                        onClick={() => {
                                            setCurrentHDate(new HDate(1, currentHDate.getMonth(), year));
                                            setShowMonthYearPicker(false);
                                        }}
                                        style={{
                                            padding: 6,
                                            cursor: "pointer",
                                            color: currentHDate.getFullYear() === year ? "var(--rhdp-on-primary, white)" : "var(--rhdp-muted, #333)",
                                            backgroundColor: currentHDate.getFullYear() === year ? "var(--rhdp-primary, #4da6ff)" : "transparent",
                                            borderRadius: 6
                                        }}
                                    >
                                        {label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {showGregorianPicker && (
                    <div className="month-year-picker rhdp-month-year-overlay">
                        <div className="rhdp-month-year-column" style={{ direction: "rtl" }}>
                            {gregorianMonths.map((monthName, monthIndex) => (
                                <div
                                    key={monthName}
                                    className="rhdp-picker-item"
                                    onClick={() => jumpToGregorianMonth(monthIndex, focusGregorian.getFullYear())}
                                    style={{
                                        padding: 6,
                                        cursor: "pointer",
                                        color: focusGregorian.getMonth() === monthIndex ? "var(--rhdp-on-primary, white)" : "var(--rhdp-muted, #333)",
                                        backgroundColor: focusGregorian.getMonth() === monthIndex ? "var(--rhdp-primary, #4da6ff)" : "transparent",
                                        borderRadius: 6
                                    }}
                                >
                                    {monthName}
                                </div>
                            ))}
                        </div>
                        <div
                            ref={gregorianYearScrollRef}
                            className="rhdp-month-year-column"
                            style={{ direction: "rtl" }}
                        >
                            {selectableGregorianYears.map((year) => (
                                <div
                                    key={year}
                                    data-year={year}
                                    className="rhdp-picker-item"
                                    onClick={() => jumpToGregorianMonth(focusGregorian.getMonth(), year)}
                                    style={{
                                        padding: 6,
                                        cursor: "pointer",
                                        color: focusGregorian.getFullYear() === year ? "var(--rhdp-on-primary, white)" : "var(--rhdp-muted, #333)",
                                        backgroundColor: focusGregorian.getFullYear() === year ? "var(--rhdp-primary, #4da6ff)" : "transparent",
                                        borderRadius: 6
                                    }}
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div key={currentHDate.toString()} className={`calendar-days ${transitionDirection === "forward" ? "slide-right" : "slide-left"}`}
                    style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: showGregorian ? 4 : 6, textAlign: "center" }}>

                    {daysOfWeek.map((d) => (
                        <div key={d} style={{ fontWeight: "bold", color: "var(--rhdp-primary, #4da6ff)" }}>{d}</div>
                    ))}
                    {daysArray.map((day, i) => {
                        if (!day) return <div key={i} />;
                        const iso = hebrewDayToIso(day, currentHDate.getMonth(), currentHDate.getFullYear());
                        const dayDisabled = isIsoDisabled(iso, minDate, maxDate, isDateDisabled);
                        const gregorianDay = showGregorian
                            ? gregorianDateForHebrewDay(day, currentHDate.getMonth(), currentHDate.getFullYear()).getDate()
                            : null;
                        const isSelected =
                            selectedHDate.getDate() === day &&
                            selectedHDate.getMonth() === currentHDate.getMonth() &&
                            selectedHDate.getFullYear() === currentHDate.getFullYear();
                        return (
                            <button
                                key={i}
                                type="button"
                                disabled={dayDisabled}
                                aria-disabled={dayDisabled}
                                onClick={() => handleSelect(day)}
                                className={`date-picker-day${isSelected ? " selected" : ""}${dayDisabled ? " disabled" : ""}${showGregorian ? " rhdp-day-dual" : ""}`}
                                style={{
                                    minWidth: showGregorian ? 42 : 36,
                                    minHeight: showGregorian ? 42 : 36,
                                    backgroundColor: dayDisabled ? 'var(--rhdp-disabled-bg, #f3f4f6)' : 'var(--rhdp-surface, #ffffff)',
                                    color: isSelected ? 'var(--rhdp-on-primary, #fff)' : 'var(--rhdp-text, #444)',
                                    borderRadius: 8,
                                    fontSize: 14,
                                    cursor: dayDisabled ? 'not-allowed' : 'pointer',
                                    padding: showGregorian ? 0 : 8,
                                    transition: 'border .2s,background .2s,color .2s',
                                    boxSizing: 'border-box',
                                    margin: 0
                                }}
                            >
                                <span className={showGregorian ? "rhdp-hebrew-day" : undefined}>{hebrewNumber(day)}</span>
                                {showGregorian && (
                                    <span className="rhdp-gregorian-day">{gregorianDay}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <button
                        type="button"
                        disabled={todayBlocked}
                        onClick={() => {
                            const today = new HDate();
                            setCurrentHDate(today);
                            if (todayBlocked) return;
                            onChange?.({ target: { name, value: todayIso } });
                            setShowCalendar(false);
                        }}

                        style={{
                            fontSize: 14,
                            color: todayBlocked ? "var(--rhdp-disabled-text, #9ca3af)" : "var(--rhdp-primary, #4da6ff)",
                            background: "none",
                            border: "none",
                            cursor: todayBlocked ? "not-allowed" : "pointer",
                            textDecoration: "underline",
                        }}
                    >
                        {labels.today || "היום"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            onChange?.({ target: { name, value: "" } });
                            setShowCalendar(false);
                        }}
                        style={{
                            fontSize: 14,
                            color: "var(--rhdp-primary, #4da6ff)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                        }}
                    >
                        {labels.clear || "נקה"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CalendarPopup;
