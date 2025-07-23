# React Hebrew DatePicker / בוחר תאריכים עברי

A beautiful and functional Hebrew date picker component for React with full Hebrew calendar support and Gregorian conversion.

קומפוננטה יפה ופונקציונלית לבחירת תאריכים עבריים ב-React עם תמיכה מלאה בלוח העברי והמרה ללוח הגרגוריאני.

[![npm version](https://img.shields.io/npm/v/react-hebrew-datepicker.svg)](https://www.npmjs.com/package/react-hebrew-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/react-hebrew-datepicker.svg)](https://www.npmjs.com/package/react-hebrew-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/min/react-hebrew-datepicker)](https://bundlephobia.com/package/react-hebrew-datepicker)
[![GitHub stars](https://img.shields.io/github/stars/Es-Mes/react-hebrew-datepicker.svg?style=social&label=Star)](https://github.com/Es-Mes/react-hebrew-datepicker)

## Demo / דמו

![Hebrew DatePicker Demo](screenshots/Hebrew%20DatePicker.gif)

*Interactive Hebrew date picker with Gregorian conversion*

## Features / תכונות

- 📅 **Hebrew Calendar Support** - Full Hebrew calendar with proper month and year calculations
- 🔄 **Gregorian Conversion** - Automatic conversion between Hebrew and Gregorian dates
- 🎨 **Beautiful UI** - Modern and clean design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- 🌐 **RTL Support** - Right-to-left layout support for Hebrew text
- ⚡ **Lightweight** - Minimal dependencies and optimized performance
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 🎪 **Portal Support** - Optional rendering outside component tree

## Installation / התקנה

```bash
npm install react-hebrew-datepicker
# or
yarn add react-hebrew-datepicker
```

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | The name attribute for the input field |
| `value` | `string` | `undefined` | Current value as ISO date string (YYYY-MM-DD) - for controlled mode |
| `defaultValue` | `string` | `undefined` | Initial value as ISO date string (YYYY-MM-DD) - for uncontrolled mode |
| `onChange` | `function` | `undefined` | Callback when date changes: `(event) => void` |
| `required` | `boolean` | `false` | Whether the field is required |
| `label` | `string` | `"בחר תאריך"` | Label text for the input field |
| `usePortal` | `boolean` | `false` | Render calendar popup using React Portal |

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

### CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
:root {
  --bgSoft: #4da6ff; /* Primary color for selected dates and buttons */
}
```

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
git clone https://github.com/yourusername/react-hebrew-datepicker.git

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## License / רישיון

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog / יומן שינויים

### v1.0.5
- Fixed calendar popup positioning for better centering
- Improved year picker UX - now opens at current year instead of start of list
- Enhanced calendar positioning to be more user-friendly
- Better responsive behavior for calendar popup

### v1.0.4
- Added support for uncontrolled mode with `defaultValue` prop
- Component now manages internal state when `value` is not provided
- Improved flexibility - supports both controlled and uncontrolled usage patterns
- Enhanced user experience - date picker works immediately without external state management

### v1.0.3
- Enhanced tooltips for calendar navigation ("Previous Month", "Next Month")
- Improved CSS styling with custom CSS variables support
- Better user experience and accessibility

### v1.0.2
- Fixed Hebrew date formatting display
- Improved build configuration and bundle optimization

### v1.0.1
- Initial bug fixes and improvements

### v1.0.0
- Initial release
- Hebrew calendar support
- Gregorian conversion  
- TypeScript definitions
- Portal support
- RTL layout

## Support / תמיכה

If you have any issues or questions, please open an issue on [GitHub](https://github.com/yourusername/react-hebrew-datepicker/issues).

אם יש לכם בעיות או שאלות, אנא פתחו issue ב-[GitHub](https://github.com/yourusername/react-hebrew-datepicker/issues).

---

Made with ❤️ for the Hebrew-speaking developer community.

נוצר ❤️ עבור קהילת המפתחים דוברי העברית ולשימוש נח בלוח העברי.
