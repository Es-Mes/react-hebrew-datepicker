import { useState } from 'react'
// import HebrewDatePicker from 'react-hebrew-datepicker'
// import 'react-hebrew-datepicker/dist/styles.css'
import HebrewDatePicker from '../../dist/index.esm.js'
import '../../dist/styles.css'
import './App.css'

function App() {
  const [controlledDate, setControlledDate] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    hebrewDate: '',
    regularDate: ''
  })
  const [externalLabelDate, setExternalLabelDate] = useState('')
  const [englishLabelsDate, setEnglishLabelsDate] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [weekdayOnlyDate, setWeekdayOnlyDate] = useState('')
  const [themeDate, setThemeDate] = useState('')
  const [flipDate, setFlipDate] = useState('')
  const [gregorianDate, setGregorianDate] = useState('')

  const toLocalIso = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const todayIso = toLocalIso(new Date())

  const handleControlledDateChange = (event) => {
    setControlledDate(event.target.value)
    console.log('תאריך נבחר:', event.target.value)
  }

  const handleUncontrolledDateChange = (event) => {
    console.log('תאריך לא מבוקר נבחר:', event.target.value)
  }

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log('נתוני הטופס:', formData)
    alert(`נתוני הטופס נשלחו:\nשם: ${formData.name}\nתאריך עברי: ${formData.hebrewDate}\nתאריך רגיל: ${formData.regularDate}`)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Hebrew DatePicker Demo</h1>
        <p>דמו לקומפוננטת בוחר התאריכים העברי</p>
        <div className="links">
          <a href="https://www.npmjs.com/package/react-hebrew-datepicker" target="_blank" rel="noopener noreferrer">
            📦 npm Package
          </a>
          <a href="https://github.com/Es-Mes/react-hebrew-datepicker" target="_blank" rel="noopener noreferrer">
            🐙 GitHub Repository
          </a>
          <a href="https://github.com/Es-Mes/react-hebrew-datepicker#usage--שימוש" target="_blank" rel="noopener noreferrer">
            � Documentation & Examples
          </a>
        </div>
      </header>

      <main className="app-main">
        {/* זוג ראשון: דוגמאות בסיסיות */}
        <div className="demo-grid">
          <section className="demo-section">
            <h2>דוגמה מבוקרת (Controlled)</h2>
            <p> שליטה בערך דרך state - הערך מוצג למטה בזמן אמת</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="controlledDate"
                value={controlledDate}
                onChange={handleControlledDateChange}
                label="בחר תאריך עברי"
                required
              />
              <div className="result">
                <strong>תאריך נבחר:</strong> {controlledDate || 'לא נבחר תאריך'}
              </div>
            </div>
          </section>

          <section className="demo-section">
            <h2>דוגמה לא מבוקרת (Uncontrolled)</h2>
            <p>הקומפוננטה מנהלת את הערך בעצמה - רק נותנת ערך התחלתי</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="uncontrolledDate"
                defaultValue="2024-01-01"
                onChange={handleUncontrolledDateChange}
                label="תאריך עברי עם ערך ברירת מחדל"
              />
            </div>
          </section>
        </div>

        {/* זוג שני: דוגמאות מתקדמות */}
        <div className="demo-info-box">
          <h3>💡 שימו לב להבדל:</h3>
          <p>
            <strong>בלי Portal:</strong> הלוח עלול להתנגש עם תוכן אחר בעמוד<br />
            <strong>עם Portal:</strong> הלוח מוצג תמיד בצורה נקייה ומעל כל התוכן
          </p>
        </div>
        <div className="demo-grid">
          <section className="demo-section">
            <h2>עם Portal ✨</h2>
            <p>הלוח יוצג מחוץ לעץ הקומפוננטות - פותר בעיות z-index וחסימה</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="portalDate"
                onChange={(e) => console.log('Portal date:', e.target.value)}
                label="תאריך עברי עם Portal"
                usePortal={true}
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>כיוון משמאל לימין (LTR)</h2>
            <p>קומפוננטה עם כיוון LTR - שימו לב שהלוח עלול להתנגש עם התוכן מתחת</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="ltrDate"
                onChange={(e) => console.log('LTR date:', e.target.value)}
                label="Hebrew Date (LTR Direction)"
                dir="ltr"
              />
            </div>
          </section>
        </div>

        <div className="demo-info-box">
          <h3>יכולות טופס חדשות</h3>
          <p>
            נעילת שדה, הסתרת תווית פנימית, תרגום טקסטים, וחסימת תאריכים בלוח עצמו.
            בדוגמת תאריך הלידה לחצי על החודש/שנה — רשימת השנים נמתחת לפי min/max.
          </p>
        </div>
        <div className="demo-grid">
          <section className="demo-section">
            <h2>שדה נעול (disabled)</h2>
            <p>לחיצה על השדה או על האייקון לא פותחת את הלוח. שימושי בטופס לצפייה בלבד.</p>
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
            <h2>תווית חיצונית (label=null)</h2>
            <p>התווית של הטופס נשארת; הקומפוננטה לא מציגה תווית כפולה.</p>
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
              <div className="result">
                <strong>תאריך נבחר:</strong> {externalLabelDate || 'לא נבחר תאריך'}
              </div>
            </div>
          </section>
        </div>

        <div className="demo-grid">
          <section className="demo-section">
            <h2>טקסטים מותאמים (labels)</h2>
            <p>העברת תרגום מהאפליקציה — כאן אנגלית. ברירת המחדל בלי prop הזה נשארת עברית.</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="englishLabelsDate"
                value={englishLabelsDate}
                onChange={(event) => setEnglishLabelsDate(event.target.value)}
                dir="ltr"
                label="Appointment date"
                labels={{
                  placeholder: 'Select a Hebrew date',
                  today: 'Today',
                  clear: 'Clear',
                  nextMonth: 'Next month',
                  prevMonth: 'Previous month',
                }}
              />
              <div className="result">
                <strong>Selected:</strong> {englishLabelsDate || 'none'}
              </div>
            </div>
          </section>

          <section className="demo-section">
            <h2>תאריך לידה (minDate / maxDate)</h2>
            <p>אי אפשר לבחור תאריך עתידי. פתחי את בוחר השנים — הטווח מתחיל מ-1940, לא רק ±30.</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="birthDate"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                label="תאריך לידה"
                minDate="1940-01-01"
                maxDate={todayIso}
              />
              <div className="result">
                <strong>תאריך נבחר:</strong> {birthDate || 'לא נבחר תאריך'}
              </div>
            </div>
          </section>
        </div>

        <section className="demo-section">
          <h2>חסימה מותאמת (isDateDisabled)</h2>
          <p>שישי ושבת חסומים בלוח. ימים אפורים לא ניתנים לבחירה.</p>
          <div className="demo-container">
            <HebrewDatePicker
              name="weekdayOnlyDate"
              value={weekdayOnlyDate}
              onChange={(event) => setWeekdayOnlyDate(event.target.value)}
              label="תאריך בימי חול בלבד"
              isDateDisabled={(isoDate) => {
                const weekday = new Date(`${isoDate}T12:00:00`).getDay()
                return weekday === 5 || weekday === 6
              }}
            />
            <div className="result">
              <strong>תאריך נבחר:</strong> {weekdayOnlyDate || 'לא נבחר תאריך'}
            </div>
          </div>
        </section>

        <div className="demo-info-box">
          <h3>תימה ומיקום</h3>
          <p>
            צבעים דרך משתני CSS (בלי לגעת בקוד החבילה). הלוח נפתח מתחת כשיש מקום, ומעל כשאין.
            בוחר החודש/שנה נפתח מעל ימי החודש ולא מגדיל את הלוח.
          </p>
        </div>
        <div className="demo-grid">
          <section className="demo-section">
            <h2>ערכת צבעים (--rhdp-primary)</h2>
            <p>עטיפה ירוקה דורסת רק את צבע ההדגשה. שאר הדוגמאות בדף נשארות כחולות כמו קודם.</p>
            <div className="demo-container">
              <HebrewDatePicker
                name="themeDate"
                value={themeDate}
                onChange={(event) => setThemeDate(event.target.value)}
                label="תאריך עם צבע מותאם"
                className="rhdp-theme-green"
                usePortal
              />
              <div className="result">
                <strong>תאריך נבחר:</strong> {themeDate || 'לא נבחר תאריך'}
              </div>
            </div>
          </section>

          <section className="demo-section">
            <h2>פתיחה למעלה (flip)</h2>
            <p>השדה יושב בתחתית אזור גבוה. גללי עד שהוא כמעט בתחתית החלון ופתחי — הלוח עולה למעלה.</p>
            <div className="flip-demo-box">
              <p className="flip-demo-hint">גללי לכאן אם צריך, ואז פתחי את הלוח</p>
              <HebrewDatePicker
                name="flipDate"
                value={flipDate}
                onChange={(event) => setFlipDate(event.target.value)}
                label="שדה בתחתית האזור"
                usePortal
              />
            </div>
          </section>
        </div>

        <section className="demo-section">
          <h2>תצוגה משותפת (showGregorian)</h2>
          <p>
            הרשת נשארת עברית. בכל תא מופיע גם המספר הלועזי באפור, ומתחת לכותרת יש פס אפור עם החודש והשנה הלועזיים.
            לחיצה על הפס פותחת בוחר חודש/שנה לועזי ומקפיצה את הלוח לשם.
          </p>
          <div className="demo-container">
            <HebrewDatePicker
              name="gregorianDate"
              value={gregorianDate}
              onChange={(event) => setGregorianDate(event.target.value)}
              label="תאריך עם תצוגת לועזי"
              showGregorian
            />
            <div className="result">
              <strong>תאריך נבחר:</strong> {gregorianDate || 'לא נבחר תאריך'}
            </div>
          </div>
        </section>

        {/* שילוב בטופס */}
        <section className="demo-section">
          <h2>שילוב בטופס</h2>
          <p>דוגמה לשימוש בתוך טופס עם שדות נוספים</p>
          <form onSubmit={handleFormSubmit} className="demo-form">
            <div className="form-group">
              <label htmlFor="name">שם מלא:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="הכנס שם מלא"
                required
              />
            </div>

            <div className="form-group">
              <HebrewDatePicker
                name="hebrewDate"
                value={formData.hebrewDate}
                onChange={handleFormChange}
                label="תאריך עברי"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="regularDate">תאריך רגיל:</label>
              <input
                type="date"
                id="regularDate"
                name="regularDate"
                value={formData.regularDate}
                onChange={handleFormChange}
              />
            </div>

            <button type="submit" className="submit-btn">שלח טופס</button>
          </form>
        </section>

        {/* מידע על החבילה */}
        <section className="demo-section info-section">
          <h2>אודות החבילה</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>📅 תמיכה בלוח העברי</h3>
              <p>תמיכה מלאה בלוח העברי עם חישובי חודשים ושנים נכונים</p>
            </div>
            <div className="feature">
              <h3>🔄 המרה גרגוריאנית</h3>
              <p>המרה אוטומטית בין תאריכים עבריים וגרגוריאניים</p>
            </div>
            <div className="feature">
              <h3>🎨 UI יפה</h3>
              <p>עיצוב מודרני ונקי עם אנימציות חלקות</p>
            </div>
            <div className="feature">
              <h3>📱 רספונסיבי</h3>
              <p>עובד מושלם על מחשבים ומכשירים ניידים</p>
            </div>
            <div className="feature">
              <h3>🌐 תמיכה RTL</h3>
              <p>תמיכה בפריסה מימין לשמאל לטקסט עברי</p>
            </div>
            <div className="feature">
              <h3>⚡ קל משקל</h3>
              <p>תלויות מינימליות וביצועים מוטבים</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>נוצר ❤️ עבור קהילת המפתחים דוברי העברית ומשתמשי הלוח העברי</p>
        <p>Made with ❤️ for the Hebrew-speaking developer community</p>
      </footer>
    </div>
  )
}

export default App
