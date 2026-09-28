# Trainer Portfolio

A single-page portfolio with a bright, Pokémon-route creative direction:
tall-grass intro with a catchable Poké Ball, a Trainer Card hero, a Pokédex of
projects, an evolving experience timeline, a Pokémon Center contact section and
a "Gotta catch 'em all" mini-game.

Inspired by thezeroquotient.com/portfolio. Sprites come from
[PokeAPI/sprites](https://github.com/PokeAPI/sprites) and cries from
[PokeAPI/cries](https://github.com/PokeAPI/cries), loaded straight from GitHub.

## Structure
- `index.html` — page markup (name, intro copy, links, contact)
- `css/styles.css` — theme tokens, layout, animations, responsive rules
- `js/main.js` — content data, sprites, intro catch sequence, scroll effects, case studies, mini-game

## Editing content
All copy lives in arrays near the top of `js/main.js`:
`STOPS` (journey), `SKILLS` and `RADAR` (base stats), `HABITATS`,
`PROJECTS` (Pokédex cards + case studies) and `MILES` (experience / evolution).
Name, intro and social links are in `index.html` (search for "Rowan").

## Changing Pokémon
Every Pokémon is just a National Dex number:
- `mon:` on projects, habitats and milestones in `js/main.js`
- `data-mon` on each `<section>` sets the floating companion for that section
- `data-art="25"` (official artwork) or `data-anim="25"` (animated sprite) on any `<img>`

Find numbers at https://pokeapi.co or any Pokédex. Mega/alternate forms use
ids above 10000 (e.g. `10034` = Mega Charizard X).

## Intro
The intro plays once per browser session. Add `?skip-intro` to the URL to
go straight to the content (useful when sharing a link or developing).

## Running locally
Open `index.html` in a browser, or serve the folder:

    npx serve .

## Contact form
The form validates input and opens the visitor's email app. Change the address
in `js/main.js` (search `mailto:`) and in `index.html`, or wire it to a form
service such as Formspree.

## Legal
Pokémon and all related names and artwork are © Nintendo, Game Freak and The
Pokémon Company. This is an unofficial fan project; keep the footer notice, and
swap in your own artwork if you use the site commercially.
