Web Portal
===
A simple startpage with a multi-engine search bar and customizable widgets.

https://tu0m.github.io/webportal/

TO-DO
---

### Widgets

- [x] Link
- [x] Time
    - [ ] Time zones, cities
        - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
        - https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding_.2F_Address_lookup
    - [ ] Analog clock (separate widget?)

- [x] Date
    - Current day's kanji?
- [ ] Current price of electricity (Nordpool)
    - ENTSO-E API: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html
    - Fingrid API: https://data.fingrid.fi/instructions
- [ ] Current weather
    - [ ] yr.no API
- [x] Search bar with multiple search engines
    - [x] Tab shortcut to change engine
    - [ ] Dropdown menu to change engine (for mobile)
    - [ ] Edit / add search engines
    - [ ] Option to hide search bar
- [ ] Wallpapers
    - [ ] Bing Wallpaper
    - [ ] Google Earth
    - [ ] Google Chromecast
    - [ ] NASA
    - [ ] Wallhaven
    - [ ] User set wallpaper / color
    - What's good and legal to use?
- [ ] Countdown
    - Days until set date
    - Hours/minutes until set time
- [ ] Pomodoro
    - 25m timer that rings after time is full (can this be easily done with browsers?)
- [ ] Headlines
    - Bar similar to search widget, but moveable?
    - Any free to use news APIs?
- [ ] Current stock price
    - https://www.npmjs.com/package/yahoo-finance2

### General features

- [ ] Themes / change color scheme
    - Auto based on wallpaper?
- [ ] Scaling
    - 1x, 2x, 3x
    - For television use / public places / etc ?
- [ ] Hide widgets on idle (option)
- [x] Save to localStorage
    - [ ] Ability to share configuration file (parseable ?URL thingy, share code, QR?)
    - [ ] Ability to save config to server and have a real up-to-date shareable URL

### Bugs

- Make UI less wide for phones (tested iPhone 14 Pro, vw is 393px?)
- Inform users if their browser is too old (or add polyfill)
- iPhone: Stop opening google search of widget uuid when dragging and dropping (happens on drop)