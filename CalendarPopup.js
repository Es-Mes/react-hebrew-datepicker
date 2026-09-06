// CalendarPopup.jsx
import React, { useEffect, useRef } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { HDate } from "@hebcal/core";
import './HebrewDatePicker.css';

const hebrewMonths = [
    "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול",
    "תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר א׳", "אדר ב׳"
];

const daysOfWeek = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

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
}) => {
    const yearScrollRef = useRef(null);

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
                    width: 320,
                    maxHeight: "min(90vh, 480px)",
                    fontFamily: "var(--rhdp-font, Arial, sans-serif)",
                    zIndex: 10000,
                    ...themeStyle,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, borderBottom: "1px solid var(--rhdp-divider, #eee)" }}>
                    <h3
                        style={{ margin: 0, fontSize: 16, color: "var(--rhdp-primary, #4da6ff)", cursor: "pointer" }}
                        onClick={() => setShowMonthYearPicker((prev) => !prev)}
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

                <div className="rhdp-calendar-body">
                {showMonthYearPicker && (
                    <div className="month-year-picker rhdp-month-year-overlay">
                        <div style={{ direction: "rtl" }}>
                            {hebrewMonths.map((monthName, i) => (
                                <div
                                    key={i + 1}
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
                            style={{ direction: "rtl" }}
                        >
                            {selectableYears.map((year) => {
                                const label = new HDate(1, 1, year).renderGematriya().split(" ").pop();
                                return (
                                    <div
                                        key={year}
                                        data-year={year}
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

                <div key={currentHDate.toString()} className={`calendar-days ${transitionDirection === "forward" ? "slide-right" : "slide-left"}`}
                    style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, textAlign: "center" }}>

                    {daysOfWeek.map((d) => (
                        <div key={d} style={{ fontWeight: "bold", color: "var(--rhdp-primary, #4da6ff)" }}>{d}</div>
                    ))}
                    {daysArray.map((day, i) => {
                        if (!day) return <div key={i} />;
                        const iso = hebrewDayToIso(day, currentHDate.getMonth(), currentHDate.getFullYear());
                        const dayDisabled = isIsoDisabled(iso, minDate, maxDate, isDateDisabled);
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
                                className={`date-picker-day${isSelected ? " selected" : ""}${dayDisabled ? " disabled" : ""}`}
                                style={{
                                    minWidth: 36,
                                    minHeight: 36,
                                    color: isSelected ? 'var(--rhdp-on-primary, #fff)' : 'var(--rhdp-text, #444)',
                                    borderRadius: 8,
                                    fontSize: 14,
                                    cursor: dayDisabled ? 'not-allowed' : 'pointer',
                                    padding: 8,
                                    transition: 'border .2s,background .2s,color .2s',
                                    boxSizing: 'border-box',
                                    margin: 0
                                }}
                            >
                                {hebrewNumber(day)}
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
