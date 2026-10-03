# Pocket Arcade

Open `index.html` directly in a browser. The complete app is one offline HTML file, with no dependencies, fonts, images or network requests.

Three original implementations of classic arcade mechanics: Falling Blocks, Snake, and Brick Breaker.

## Controls

- D-pad / arrow keys: menu navigation and movement.
- A / X: rotate blocks, launch the ball, or choose a game.
- B / Z: drop blocks instantly.
- Start / Enter: play, pause, resume, or restart after game over.
- Select / Shift: return to the game menu.
- Color button: toggle colorful and grayscale screens; initial screen uses classic green LCD colors.

Touch buttons support pointer capture and simultaneous presses. The layout adapts to narrow mobile screens. Leaving the page pauses gameplay.

## Architecture

The HTML has three sections: console markup, responsive CSS, and JavaScript. JavaScript separates shared rendering helpers, independent game classes (`input`, `update`, `draw`), and the console controller. One animation loop drives all games; simulation time is capped after tab changes.

Run game logic checks with `node tests/games.cjs`. Preview over HTTP with `python3 -m http.server 8088`.

Verified in the desktop browser and a 402 × 874 viewport. Physical iPhone testing has not been performed.

## Verification

Run `node tests/games.cjs` to check Snake food, reversal and collisions; falling-block line clearing and hard drops; brick collisions and lives; and all three cartridge launches, rendering, pause/resume and menu wrapping.

This published version contains three games. The additional adventure cartridges are not included.
