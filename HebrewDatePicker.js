import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { HDate } from "@hebcal/core";
import './HebrewDatePicker.css';
import CalendarPopup from "./CalendarPopup";

const DEFAULT_LABELS = {
  placeholder: "בחר תאריך עברי",
  today: "היום",
  clear: "נקה",
  nextMonth: "חודש הבא",
  prevMonth: "חודש קודם",
};

const THEME_VARS = [
  "--rhdp-primary",
  "--rhdp-on-primary",
  "--rhdp-surface",
  "--rhdp-text",
  "--rhdp-muted",
  "--rhdp-border",
  "--rhdp-day-border",
  "--rhdp-divider",
  "--rhdp-disabled-bg",
  "--rhdp-disabled-text",
  "--rhdp-font",
  "--rhdp-shadow",
  "--rhdp-radius",
  "--rhdp-gregorian",
  "--rhdp-gregorian-bar",
];

const POPUP_WIDTH = 320;
const POPUP_GAP = 8;
const FALLBACK_POPUP_HEIGHT = 380;

const readThemeVars = (element) => {
  if (!element) return {};
  const computed = getComputedStyle(element);
  const style = {};
  THEME_VARS.forEach((name) => {
    const value = computed.getPropertyValue(name).trim();
    if (value) style[name] = value;
  });
  return style;
};

const computeCalendarPosition = (inputEl, popupEl, usePortal, popupWidth = POPUP_WIDTH) => {
  const rect = inputEl.getBoundingClientRect();
  const height = popupEl?.offsetHeight || FALLBACK_POPUP_HEIGHT;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const openAbove = spaceBelow < height + POPUP_GAP && spaceAbove > spaceBelow;

  if (!usePortal) {
    return openAbove
      ? { top: "auto", bottom: `calc(100% + ${POPUP_GAP}px)`, left: 0 }
      : { top: `calc(100% + ${POPUP_GAP}px)`, bottom: "auto", left: 0 };
  }

  let left = rect.left + window.scrollX + (rect.width - popupWidth) / 2;
  const minLeft = window.scrollX + 10;
  const maxLeft = window.scrollX + window.innerWidth - popupWidth - 10;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  return {
    top: openAbove
      ? rect.top + window.scrollY - height - POPUP_GAP
      : rect.bottom + window.scrollY + POPUP_GAP,
    bottom: "auto",
    left,
  };
};

const HebrewDatePicker = ({
  name,
  value,
  defaultValue,
  onChange,
  required,
  label,
  usePortal = false,
  dir = "rtl",
  disabled = false,
  labels,
  minDate,
  maxDate,
  isDateDisabled,
  className,
  popupClassName,
  showGregorian = false,
}) => {
  const resolvedLabel = label === undefined ? "בחר תאריך" : label;
  const showLabel = typeof resolvedLabel === "string";
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  // Support both controlled and uncontrolled modes
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = isControlled ? value : internalValue;

  const showDate = currentValue ? new Date(currentValue) : new Date();
  const selectedHDate = new HDate(showDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentHDate, setCurrentHDate] = useState(selectedHDate);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });

  const popupRef = useRef(null);
  const inputRef = useRef();
  const rootRef = useRef(null);
  const [themeStyle, setThemeStyle] = useState({});

  const [transitionDirection, setTransitionDirection] = useState("forward");

  const toggleCalendar = () => {
    if (disabled) return;
    setShowCalendar((v) => !v);
  };

  // Update selectedHDate when value changes (for controlled mode)
  useEffect(() => {
    if (isControlled && value) {
      const newDate = new Date(value);
      const newHDate = new HDate(newDate);
      setCurrentHDate(newHDate);
    } else if (!isControlled && internalValue) {
      const newDate = new Date(internalValue);
      const newHDate = new HDate(newDate);
      setCurrentHDate(newHDate);
    }
  }, [value, internalValue, isControlled]);

  // Internal change handler
  const handleDateChange = (event) => {
    const newValue = event.target.value;

    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Call external onChange if provided
    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowCalendar(false);
        setShowMonthYearPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (disabled) {
      setShowCalendar(false);
      setShowMonthYearPicker(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (rootRef.current) {
      setThemeStyle(readThemeVars(rootRef.current));
    }
  }, [className, showCalendar]);

  useEffect(() => {
    if (!showCalendar || !inputRef.current) return undefined;

    const updatePosition = () => {
      setCalendarPos(computeCalendarPosition(
        inputRef.current,
        popupRef.current,
        usePortal,
        showGregorian ? 368 : POPUP_WIDTH,
      ));
    };

    updatePosition();
    const frame = requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [showCalendar, showMonthYearPicker, usePortal, showGregorian]);

  const calendarProps = {
    popupRef,
    currentHDate,
    selectedHDate,
    onChange: handleDateChange,
    setShowCalendar,
    setCurrentHDate,
    setShowMonthYearPicker,
    showMonthYearPicker,
    transitionDirection,
    setTransitionDirection,
    name,
    labels: mergedLabels,
    minDate,
    maxDate,
    isDateDisabled,
    popupClassName,
    themeStyle,
    showGregorian,
  };

  return (
    <div
      ref={rootRef}
      className={["rhdp", className].filter(Boolean).join(" ")}
      style={{ position: "relative", maxWidth: 360, margin: "auto", fontFamily: "var(--rhdp-font, Arial, sans-serif)" }}
      dir={dir}
    >
      {showLabel && (
        <label htmlFor={name} style={{ display: "block", marginBottom: 6 }}>
          {resolvedLabel}{required && " *"}
        </label>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          ref={inputRef}
          type="text"
          id={name}
          name={name}
          readOnly
          required={required}
          disabled={disabled}
          aria-disabled={disabled}
          value={currentValue ? formatHebrewDate(selectedHDate) : ""}
          placeholder={mergedLabels.placeholder}
          style={{
            padding: 10,
            borderRadius: 5,
            width: "100%",
            backgroundColor: disabled ? "var(--rhdp-disabled-bg, #f3f4f6)" : "var(--rhdp-surface, white)",
            color: disabled ? "var(--rhdp-disabled-text, #9ca3af)" : "var(--rhdp-text, #444)",
            fontWeight: "bold",
            cursor: disabled ? "not-allowed" : "default",
            border: "1px solid var(--rhdp-border, #ccc)",
          }}
          onClick={toggleCalendar}
        />
        <button
          onClick={toggleCalendar}
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            padding: 8,
            color: disabled ? "var(--rhdp-disabled-text, #9ca3af)" : "var(--rhdp-primary, #4da6ff)",
            border: "none",
            borderRadius: 6,
            background: "none",
            fontSize: 22,
          }}
        ><IoCalendarOutline /></button>
      </div>

      {showCalendar && !disabled && (
        usePortal
          ? createPortal(
            <CalendarPopup
              {...calendarProps}
              calendarPos={calendarPos}
            />,
            document.body
          )
          :
          <CalendarPopup
            {...calendarProps}
            calendarPos={calendarPos}
          />

      )}
    </div>
  );
};

const hebrewMonths = [
  "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול",
  "תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר א׳", "אדר ב׳"
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

const formatHebrewDate = (hdate) => {
  try {
    const day = hdate.getDate();
    let monthIndex = hdate.getMonth() - 1;
    if (monthIndex === 11 && !hdate.isLeapYear()) monthIndex = 11;
    else if (monthIndex === 12 && !hdate.isLeapYear()) monthIndex = 11;
    const month = hebrewMonths[monthIndex] || "";
    const year = hdate.renderGematriya().split(" ").pop();
    return `${hebrewNumber(day)} ${month} ${year}`;
  } catch (e) {
    console.error('Error formatting Hebrew date:', e);
    return 'שגיאה בתאריך';
  }
};

export default HebrewDatePicker;
