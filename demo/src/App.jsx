import { useState } from 'react'
import HebrewDatePicker from '../../dist/index.esm.js'
import '../../dist/styles.css'
import './App.css'

function toLocalIso(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDisplayDate(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

function SelectedDate({ value, emptyLabel = 'לא נבחר תאריך' }) {
  return (
    <div className="result">
      <strong>תאריך שנבחר:</strong>{' '}
      {value ? (
        <span className="result-date" dir="ltr">{formatDisplayDate(value)}</span>
      ) : (
        emptyLabel
      )}
    </div>
  )
}

function App() {
  const todayIso = toLocalIso(new Date())
  const [gregorianDate, setGregorianDate] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [themeDate, setThemeDate] = useState('')
  const [externalLabelDate, setExternalLabelDate] = useState('')
  const [englishLabelsDate, setEnglishLabelsDate] = useState('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Hebrew DatePicker Demo</h1>
        <p>דמו לקומפוננטת בוחר התאריכים העברי</p>
        <p className="header-highlight">
          חדש ב־1.1: תצוגה משותפת עברי + לועזי — הדרך המומלצת להציג את הלוח
        </p>
        <div className="links">
          <a href="https://www.npmjs.com/package/react-hebrew-datepicker" target="_blank" rel="noopener noreferrer">
            npm Package
          </a>
          <a href="https://github.com/Es-Mes/react-hebrew-datepicker" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://github.com/Es-Mes/react-hebrew-datepicker#usage--שימוש" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </div>
      </header>

      <main className="app-main">
        <section className="demo-section demo-section-featured">
          <div className="section-heading">
            <span className="new-badge">חדש ב־1.1</span>
            <h2>תצוגה משותפת — עברי + לועזי</h2>
          </div>
          <p>
            זה הפיצ׳ר המרכזי של הגרסה: רשת עברית, מספר לועזי בכל תא, ופס חודש/שנה לועזיים.
            מופעל עם <code>showGregorian</code>. כבוי כברירת מחדל כדי לא לשנות לוחות קיימים —
            בטפסים חדשים מומלץ להפעיל אותו.
          </p>
          <div className="demo-container">
            <HebrewDatePicker
              name="gregorianDate"
              value={gregorianDate}
              onChange={(event) => setGregorianDate(event.target.value)}
              label="תאריך עברי"
              showGregorian
              usePortal
            />
            <SelectedDate value={gregorianDate} />
          </div>
        </section>

        <div className="demo-grid">
          <section className="demo-section">
            <h2>תאריך לידה</h2>
            <p>
              <code>minDate</code> / <code>maxDate</code> חוסמים ימים בלוח ומרחיבים את רשימת השנים.
            </p>
            <div className="demo-container">
              <HebrewDatePicker
                name="birthDate"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                label="תאריך לידה"
                minDate="1940-01-01"
                maxDate={todayIso}
              />
              <SelectedDate value={birthDate} />
            </div>
          </section>

          <section className="demo-section">
            <h2>ערכת צבעים</h2>
            <p>
              דריסת <code>--rhdp-primary</code> דרך <code>className</code>. שאר הדוגמאות נשארות כחולות.
            </p>
            <div className="demo-container">
              <HebrewDatePicker
                name="themeDate"
                value={themeDate}
                onChange={(event) => setThemeDate(event.target.value)}
                label="תאריך עם צבע מותאם"
                className="rhdp-theme-green"
                usePortal
              />
              <SelectedDate value={themeDate} />
            </div>
          </section>
        </div>

        <div className="demo-grid">
          <section className="demo-section">
            <h2>שדה נעול</h2>
            <p>
              <code>disabled</code> — לחיצה לא פותחת את הלוח.
            </p>
            <div className="demo-container">
              <HebrewDatePicker
                name="disabledDate"
                defaultValue="2024-01-01"
                label="תאריך נעול"
                disabled
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>תווית חיצונית</h2>
            <p>
              <code>label=&#123;null&#125;</code> כשיש כבר תווית של הטופס.
            </p>
            <div className="demo-container">
              <label className="external-field-label" htmlFor="externalLabelDate">
                תאריך מהטופס החיצוני
              </label>
              <HebrewDatePicker
                name="externalLabelDate"
                value={externalLabelDate}
                onChange={(event) => setExternalLabelDate(event.target.value)}
                label={null}
              />
            </div>
          </section>
        </div>

        <section className="demo-section demo-section-ltr">
          <h2>Portal + LTR</h2>
          <p>
            <code>usePortal</code> מוציא את הלוח מ־overflow. <code>dir="ltr"</code> ו־<code>labels</code> לאנגלית.
          </p>
          <div className="demo-container">
            <HebrewDatePicker
              name="englishLabelsDate"
              value={englishLabelsDate}
              onChange={(event) => setEnglishLabelsDate(event.target.value)}
              dir="ltr"
              usePortal
              label="Appointment date"
              labels={{
                placeholder: 'Select a Hebrew date',
                today: 'Today',
                clear: 'Clear',
                nextMonth: 'Next month',
                prevMonth: 'Previous month',
              }}
            />
            <SelectedDate value={englishLabelsDate} emptyLabel="none" />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>נוצר עבור קהילת המפתחים דוברי העברית ומשתמשי הלוח העברי</p>
        <p>Made for the Hebrew-speaking developer community</p>
      </footer>
    </div>
  )
}

export default App
