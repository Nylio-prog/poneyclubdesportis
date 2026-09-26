# Calendar

`components/Calendar.tsx` is the club's own event calendar, used on the Actualités page through
`components/CalendarSection.tsx`. It has no calendar library dependency.

## Behaviour

- Month grid (Monday first) next to the list of that month's events.
- Days with events are buttons: selecting one filters the list to that day ("Tout le mois" resets it).
- Clicking an event in the list opens `EventModal` with the image, dates and description.
- Empty months offer a jump to the next event (or the latest one when nothing is planned).
- Events with `showInCalendar: false` are hidden from the calendar but still listed on the page.
- Multi-day events appear on every day they cover.

## Dates and time zones

Grid and date maths live in `lib/calendar.ts` and work on `YYYY-MM-DD` keys with UTC dates, so the
server render and the browser render always match. The first month shown is computed on the server
in the `Europe/Paris` time zone; "today" is only highlighted once the page runs in the browser.

## Translations

Labels come from the `calendar` namespace in `messages/fr.json` and `messages/en.json`.
