# React Hebrew DatePicker

## Quick Start

```bash
npm install react-hebrew-datepicker
```

```jsx
import HebrewDatePicker from 'react-hebrew-datepicker';

function App() {
  const [date, setDate] = useState('');
  
  return (
    <HebrewDatePicker
      name="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      label="בחר תאריך עברי"
    />
  );
}
```

For full documentation, see [README.md](README.md).
