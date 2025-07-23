# Building a Hebrew Date Picker for React: From Scratch to NPM

As a developer working on Israeli applications, I often found myself struggling with Hebrew calendar integration in React projects. Most date pickers focus solely on the Gregorian calendar, leaving developers who need Hebrew date support to implement complex workarounds.

After searching for existing solutions and finding them either incomplete or difficult to use, I decided to build a comprehensive Hebrew date picker from scratch. Here's the story of how `react-hebrew-datepicker` came to life.

## The Problem

Hebrew calendar integration in web applications presents several unique challenges:

1. **Dual Calendar System**: Users often need to see both Hebrew and Gregorian dates
2. **RTL Support**: Hebrew text requires right-to-left layout support
3. **Complex Calculations**: Converting between Hebrew and Gregorian calendars isn't trivial
4. **User Experience**: The component needs to be intuitive for Hebrew speakers

## The Solution

I built `react-hebrew-datepicker` with these core principles:

### 🎯 **Dual Mode Support**
The component supports both controlled and uncontrolled modes, making it flexible for different use cases:

```jsx
// Controlled mode - you manage the state
const [date, setDate] = useState('');
<HebrewDatePicker 
  value={date} 
  onChange={(e) => setDate(e.target.value)} 
/>

// Uncontrolled mode - component manages its own state
<HebrewDatePicker 
  defaultValue="2024-01-01"
  onChange={(e) => console.log(e.target.value)} 
/>
```

### 📅 **Accurate Calendar Calculations**
Using the excellent `@hebcal/core` library, the component provides:
- Accurate Hebrew date calculations
- Leap year support
- Proper month handling (including Adar I & II)
- Automatic Gregorian conversion

### 🎨 **Beautiful, Accessible UI**
- Modern design with smooth animations
- RTL layout support
- Responsive design for mobile and desktop
- Keyboard navigation support
- Custom CSS variables for theming

### ⚡ **Developer Experience**
- TypeScript definitions included
- Portal support for complex layouts
- Minimal setup required
- Clear documentation with examples

## Key Features Deep Dive

### Hebrew Date Formatting
The component displays dates in proper Hebrew format:
```javascript
const formatHebrewDate = (hdate) => {
  const day = hebrewNumber(hdate.getDate());
  const month = hebrewMonths[hdate.getMonth() - 1];
  const year = hdate.renderGematriya().split(" ").pop();
  return `${day} ${month} ${year}`;
};
```

### Responsive Tooltips
Navigation buttons include helpful tooltips that adapt to different devices:
- Desktop: Show on hover
- Mobile: Always visible or show on tap

### Animation System
Smooth transitions between months enhance the user experience:
```css
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
```

## Installation & Usage

Getting started is simple:

```bash
npm install react-hebrew-datepicker
```

Basic usage:
```jsx
import HebrewDatePicker from 'react-hebrew-datepicker';

function App() {
  return (
    <HebrewDatePicker
      name="hebrewDate"
      label="בחר תאריך עברי"
      onChange={(e) => console.log(e.target.value)}
    />
  );
}
```

## Real-World Integration

The component integrates seamlessly with forms:

```jsx
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    hebrewDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // formData.hebrewDate contains ISO date string
    console.log('Hebrew date selected:', formData.hebrewDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HebrewDatePicker
        name="hebrewDate"
        value={formData.hebrewDate}
        onChange={(e) => setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })}
      />
    </form>
  );
}
```

## Lessons Learned

Building this component taught me several valuable lessons:

1. **User Research Matters**: Understanding how Hebrew speakers interact with calendar interfaces was crucial
2. **Accessibility First**: RTL support and keyboard navigation aren't afterthoughts
3. **API Design**: Supporting both controlled and uncontrolled modes makes the component much more versatile
4. **Documentation**: Clear examples and use cases are essential for adoption

## What's Next?

Future enhancements I'm considering:
- Date range selection
- Preset date options (holidays, etc.)
- More themes and customization options
- Integration with popular form libraries

## Try It Out!

The component is available on NPM and fully open source:

- **NPM**: `npm install react-hebrew-datepicker`
- **GitHub**: [repository link]
- **Demo**: [live demo link]

I'd love to hear your feedback and see how you use it in your projects!

---

*Have you built components for specific cultural or linguistic needs? Share your experiences in the comments!*

#React #JavaScript #OpenSource #Hebrew #i18n #Frontend
