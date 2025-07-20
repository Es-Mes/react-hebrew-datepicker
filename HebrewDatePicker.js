import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { HDate } from "@hebcal/core";
import CalendarPopup from "./CalendarPopup";

const HebrewDatePicker = ({ name, value, onChange, required, label = "בחר תאריך", usePortal = false }) => {
  const showDate = value ? new Date(value) : new Date();
  const selectedHDate = new HDate(showDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentHDate, setCurrentHDate] = useState(selectedHDate);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });

  const popupRef = useRef(null);
  const inputRef = useRef();

  const [transitionDirection, setTransitionDirection] = useState("forward");

  // Update selectedHDate when value changes
  useEffect(() => {
    if (value) {
      const newDate = new Date(value);
      const newHDate = new HDate(newDate);
      setCurrentHDate(newHDate);
    }
  }, [value]);

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
    if (showCalendar && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCalendarPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [showCalendar]);

  return (
    <div style={{ position: "relative", maxWidth: 360, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <label htmlFor={name} style={{ display: "block", marginBottom: 6 }}>{label}{required && " *"}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          ref={inputRef}
          type="text"
          id={name}
          name={name}
          readOnly
          required={required}
          value={value ? formatHebrewDate(new HDate(new Date(value))) : ""}
          placeholder="בחר תאריך עברי"
          style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc", width: "100%", backgroundColor: "white", color: "#444", fontWeight: "bold", cursor: "default" }}
          onClick={() => setShowCalendar((v) => !v)}
        />
        <button
          onClick={() => setShowCalendar((v) => !v)}
          type="button"
          style={{ cursor: "pointer", padding: 8, color: "#4da6ff", border: "none", borderRadius: 6, background: "none", fontSize: 22 }}
        ><IoCalendarOutline /></button>
      </div>

      {showCalendar && (
        usePortal
          ? createPortal(
            <CalendarPopup
              popupRef={popupRef}
              calendarPos={calendarPos}
              currentHDate={currentHDate}
              selectedHDate={selectedHDate}
              onChange={onChange}
              setShowCalendar={setShowCalendar}
              setCurrentHDate={setCurrentHDate}
              setShowMonthYearPicker={setShowMonthYearPicker}
              showMonthYearPicker={showMonthYearPicker}
              transitionDirection={transitionDirection}
              setTransitionDirection={setTransitionDirection}
              name={name}
            />,
            document.body
          )
          :
          <CalendarPopup
            popupRef={popupRef}
            calendarPos={{ top: "calc(100% + 8px)", left: 0 }}
            currentHDate={currentHDate}
            selectedHDate={selectedHDate}
            onChange={onChange}
            setShowCalendar={setShowCalendar}
            setCurrentHDate={setCurrentHDate}
            setShowMonthYearPicker={setShowMonthYearPicker}
            showMonthYearPicker={showMonthYearPicker}
            transitionDirection={transitionDirection}
            setTransitionDirection={setTransitionDirection}
            name={name}
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
    return hdate.toString();
  } catch (e) {
    console.error('Error formatting Hebrew date:', e);
    return 'שגיאה בתאריך';
  }
};

export default HebrewDatePicker;
