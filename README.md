# React Hebrew DatePicker / בוחר תאריכים עברי

A beautiful and functional Hebrew date picker component for React with full Hebrew calendar support and Gregorian conversion.

קומפוננטה יפה ופונקציונלית לבחירת תאריכים עבריים ב-React עם תמיכה מלאה בלוח העברי והמרה ללוח הגרגוריאני.

[npm](https://www.npmjs.com/package/react-hebrew-datepicker) · [GitHub](https://github.com/Es-Mes/react-hebrew-datepicker) · [MIT License](https://opensource.org/licenses/MIT) · [Live demo](https://es-mes.github.io/react-hebrew-datepicker/)

## Demo / דמו

🚀 **[Try the Live Demo / נסו את הדמו החי](https://es-mes.github.io/react-hebrew-datepicker/)**


| | |
|:---:|:---:|
| <img src="https://raw.githubusercontent.com/Es-Mes/react-hebrew-datepicker/main/screenshots/demo.gif" alt="Hebrew DatePicker Demo" width="330" /> | <img src="https://raw.githubusercontent.com/Es-Mes/react-hebrew-datepicker/main/screenshots/show-gregorian.png" alt="Shared Hebrew + Gregorian calendar" width="330" /> |


*New in 1.1: shared Hebrew + Gregorian display (`showGregorian`)*

## Recommended from 1.1 / מומלץ מגרסה 1.1

**Starting in 1.1, use the shared Hebrew + Gregorian calendar for new forms.**  

מגרסה **1.1** מומלץ להציג לוח משותף: רשת עברית, מספר לועזי בכל תא, ופס חודש/שנה לועזיים.

Enable it with `showGregorian`. The default stays `false` so existing 1.0 calendars keep their look.

```jsx
<HebrewDatePicker
  name="hebrewDate"
  value={selectedDate}
  onChange={handleDateChange}
  label="בחר תאריך"
  showGregorian
/>
```

## Features / תכונות

- 📅 **Hebrew Calendar Support** - Full Hebrew calendar with proper month and year calculations
- ⭐ **Shared Hebrew + Gregorian display (new in 1.1)** — recommended for new forms (`showGregorian`)
- 🎨 **CSS variable theming** - Override `--rhdp-primary` without `!important`
- 🔒 **Form-friendly** - `disabled`, `minDate` / `maxDate`, `isDateDisabled`, hide built-in label
- 🌐 **RTL by default** - `dir` also applies to the portal popup
- 🎯 **TypeScript Support** - Definitions include all public props
- 🎪 **Portal Support** - Optional rendering outside overflow containers

## Installation / התקנה

```bash
npm install react-hebrew-datepicker
# or
yarn add react-hebrew-datepicker
```

### Importing the CSS

To get the full default styling, make sure to import the CSS file in your app's entry point (e.g. App.js or index.js):

```js
import 'react-hebrew-datepicker/dist/styles.css';
```

If you do not import this file, the date picker will render without styles.

---

## Usage / שימוש

### Basic Example (Controlled) / דוגמה בסיסית (מבוקרת)

```jsx
import React, { useState } from 'react';
import HebrewDatePicker from 'react-hebrew-datepicker';

function App() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log('Selected date:', event.target.value); // ISO format: YYYY-MM-DD
  };

  return (
    <div style={{ padding: '20px' }}>
      <HebrewDatePicker
        name="hebrewDate"
        value={selectedDate}
        onChange={handleDateChange}
        label="בחר תאריך עברי"
        showGregorian
        required
      />
    </div>
  );
}

export default App;
```

### Simple Example (Uncontrolled) / דוגמה פשוטה (לא מבוקרת)

```jsx
import React from 'react';
import HebrewDatePicker from 'react-hebrew-datepicker';

function App() {
  const handleDateChange = (event) => {
    console.log('Selected date:', event.target.value); // ISO format: YYYY-MM-DD
  };

  return (
    <div style={{ padding: '20px' }}>
      <HebrewDatePicker
        name="hebrewDate"
        defaultValue="2024-01-01"
        onChange={handleDateChange}
        label="בחר תאריך עברי"
        required
      />
    </div>
  );
}

export default App;
```

### With Portal / עם פורטל

```jsx
<HebrewDatePicker
  name="hebrewDate"
  value={selectedDate}
  onChange={handleDateChange}
  label="בחר תאריך עברי"
  usePortal={true} // Renders calendar outside component tree
/>
```

### Form Integration / שילוב בטופס

```jsx
import React, { useState } from 'react';
import HebrewDatePicker from 'react-hebrew-datepicker';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    hebrewDate: ''
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="שם מלא"
      />
      
      <HebrewDatePicker
        name="hebrewDate"
        value={formData.hebrewDate}
        onChange={handleInputChange}
        label="תאריך עברי"
        required
      />
      
      <button type="submit">שלח</button>
    </form>
  );
}
```

## API Reference / מדריך API

### HebrewDatePicker Props


| Prop             | Type            | Default         | Description                                                                                       |
| ---------------- | --------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `name`           | `string`        | **required**    | The name attribute for the input field                                                            |
| `value`          | `string`        | `undefined`     | Current value as ISO `YYYY-MM-DD` (controlled)                                                    |
| `defaultValue`   | `string`        | `undefined`     | Initial value as ISO `YYYY-MM-DD` (uncontrolled)                                                  |
| `onChange`       | `function`      | `undefined`     | `(event) => void` — `event.target.value` is ISO `YYYY-MM-DD`                                      |
| `required`       | `boolean`       | `false`         | Whether the field is required                                                                     |
| `label`          | `string | null` | `"בחר תאריך"`   | Built-in label. Pass `null` to hide it (when the form already has a label)                        |
| `disabled`       | `boolean`       | `false`         | Locks the field; the calendar does not open                                                       |
| `labels`         | `object`        | Hebrew defaults | Override UI strings: `placeholder`, `today`, `clear`, `nextMonth`, `prevMonth`, `gregorianMonths` |
| `minDate`        | `string`        | `undefined`     | Inclusive minimum ISO date. Also expands the year list                                            |
| `maxDate`        | `string`        | `undefined`     | Inclusive maximum ISO date. Also expands the year list                                            |
| `isDateDisabled` | `function`      | `undefined`     | `(isoDate) => boolean` — block specific days in the grid                                          |
| `showGregorian`  | `boolean`       | `false`         | Hebrew grid + Gregorian day numbers and month/year bar                                            |
| `usePortal`      | `boolean`       | `false`         | Render the calendar with a React Portal (needed inside `overflow: hidden`)                        |
| `dir`            | `"rtl" | "ltr"` | `"rtl"`         | Direction of this picker only, including the portal popup                                         |
| `className`      | `string`        | `undefined`     | Extra class on the field wrapper (set CSS variables here)                                         |
| `popupClassName` | `string`        | `undefined`     | Extra class on the calendar popup                                                                 |


### Usage Modes / מצבי שימוש

**Controlled Mode** - You manage the state externally:

```jsx
const [date, setDate] = useState('');
<HebrewDatePicker value={date} onChange={(e) => setDate(e.target.value)} />
```

**Uncontrolled Mode** - Component manages its own state:

```jsx
<HebrewDatePicker defaultValue="2024-01-01" onChange={(e) => console.log(e.target.value)} />
```

### Theming / ערכת צבעים

Default accent is `#4da6ff`. Override CSS variables on `className` (works with Portal too):

```css
.my-datepicker {
  --rhdp-primary: #1677ff;
}
```

```jsx
<HebrewDatePicker className="my-datepicker" showGregorian />
```

Useful variables: `--rhdp-primary`, `--rhdp-on-primary`, `--rhdp-surface`, `--rhdp-text`, `--rhdp-border`, `--rhdp-font`, `--rhdp-shadow`, `--rhdp-radius`, `--rhdp-gregorian`, `--rhdp-gregorian-bar`.

`popupClassName` styles the opened calendar when it is rendered with `usePortal` (outside the field wrapper).

### Form examples / דוגמאות טופס

Birth date (no future dates; year list follows the range):

```jsx
<HebrewDatePicker
  name="birthDate"
  value={birthDate}
  onChange={handleDateChange}
  label="תאריך לידה"
  minDate="1940-01-01"
  maxDate={todayIso}
  showGregorian
/>
```

Hide the built-in label when the form already renders one:

```jsx
<HebrewDatePicker name="date" value={date} onChange={onChange} label={null} />
```

Without `minDate` / `maxDate`, the year picker stays at ±30 around the displayed year (same as 1.0.x).

The calendar opens below the field when there is room, and above when there is not. Use `usePortal` inside a Drawer / `overflow: hidden` parent.

## Dependencies / תלויות

- **React** >= 16.8.0 (with Hooks support)
- **@hebcal/core** - For Hebrew calendar calculations
- **react-icons** - For calendar and navigation icons

## Browser Support / תמיכה בדפדפנים

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## Contributing / תרומה

Contributions are welcome! Please feel free to submit a Pull Request.

תרומות מתקבלות בברכה! אנא הגישו Pull Request.

### Development Setup / הגדרת פיתוח

```bash
# Clone the repository
git clone https://github.com/Es-Mes/react-hebrew-datepicker.git

# Install dependencies
npm install

# Watch the package and open the local demo
npm run demo:install
npm run demo:watch

# Build for production
npm run build
```

## License / רישיון

MIT License - see [LICENSE](LICENSE) file for details.

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Support / תמיכה

If you have any issues or questions, please open an issue on [GitHub](https://github.com/Es-Mes/react-hebrew-datepicker/issues).

אם יש לכם בעיות או שאלות, אנא פתחו issue ב-[GitHub](https://github.com/Es-Mes/react-hebrew-datepicker/issues).

---

Made with ❤️ for the Hebrew-speaking developer community.

נוצר ב-❤️ עבור קהילת המפתחים דוברי העברית ולשימוש נח בלוח העברי.