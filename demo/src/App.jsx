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
