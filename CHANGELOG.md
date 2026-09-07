# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-07

### Added
- `showGregorian` — optional Hebrew + Gregorian overlay (day numbers and a Gregorian month/year bar). **Default `false`** so existing calendars keep the 1.0 look
- `disabled` — lock the field without opening the calendar
- `minDate` / `maxDate` — block dates in the grid; year lists follow the range
- `isDateDisabled` — custom per-day blocking
- `labels` — override UI strings (`placeholder`, `today`, `clear`, `nextMonth`, `prevMonth`, `gregorianMonths`)
- `className` / `popupClassName` and CSS variables (`--rhdp-primary`, `--rhdp-surface`, …)
- `label={null}` hides the built-in label
- `dir` and `defaultValue` are now documented in TypeScript types
- Local `npm run demo:watch` (Rollup watch + Vite together)

### Changed
- Calendar flips above the field when there is not enough room below
- Month/year pickers overlay the day grid (no taller popup)
- Portal popups inherit `dir` (RTL month title on the right by default)
- Today / Clear are solid accent buttons instead of underlined links

### Fixed
- Hover on month/year lists no longer paints the entire column

## [1.0.0] - 2025-07-20

### Added
- Initial release of React Hebrew DatePicker
- Hebrew calendar date picker with Gregorian conversion
- Support for Hebrew months and years display
- Month/year picker functionality
- Smooth animations and transitions
- Portal rendering support
- TypeScript definitions
- RTL (Right-to-Left) layout support
- Responsive design for mobile and desktop
- CSS custom properties for theming
- Integration with @hebcal/core for accurate Hebrew calendar calculations

### Features
- ✅ Hebrew date display with proper formatting
- ✅ Gregorian to Hebrew date conversion
- ✅ Hebrew to Gregorian date conversion
- ✅ Month navigation with animations
- ✅ Year selection dropdown
- ✅ "Today" and "Clear" buttons
- ✅ Keyboard and mouse interaction
- ✅ Form integration support
- ✅ Customizable styling
- ✅ Portal rendering option

### Dependencies
- React >= 16.8.0
- @hebcal/core ^5.4.0
- react-icons ^4.12.0

### Browser Support
- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

---

## Future Releases / שחרורים עתידיים

### Planned
- [ ] Date range picker
- [ ] Keyboard navigation improvements
- [ ] Holiday highlighting
- [ ] Accessibility pass
