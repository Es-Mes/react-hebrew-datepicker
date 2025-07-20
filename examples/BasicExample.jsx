import React, { useState } from 'react';
import HebrewDatePicker from '../index';

function BasicExample() {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log('Selected Hebrew date:', event.target.value);
    };

    return (
        <div style={{
            padding: '40px',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                דוגמה לשימוש בבוחר התאריכים העברי
            </h1>

            <div style={{ marginBottom: '20px' }}>
                <HebrewDatePicker
                    name="hebrewDate"
                    value={selectedDate}
                    onChange={handleDateChange}
                    label="בחר תאריך עברי"
                    required
                />
            </div>

            {selectedDate && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px'
                }}>
                    <strong>תאריך נבחר:</strong> {selectedDate}
                </div>
            )}

            <div style={{ marginTop: '30px' }}>
                <h3>דוגמה עם פורטל:</h3>
                <HebrewDatePicker
                    name="hebrewDatePortal"
                    value={selectedDate}
                    onChange={handleDateChange}
                    label="בחר תאריך עברי (עם פורטל)"
                    usePortal={true}
                />
            </div>
        </div>
    );
}

export default BasicExample;
