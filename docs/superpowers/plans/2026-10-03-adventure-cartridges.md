# Adventure Cartridges Implementation Plan

**Publication status:** Superseded for this release. The user chose to publish the current three-game HTML on 2026-10-03. This historical plan describes an earlier six-game implementation; those cartridges are not shipped in the current source.

**Goal:** Add three original games inspired by platform, adventure and creature-collecting classics.
**Architecture:** Reuse the single-file canvas renderer, input controller and palettes. Independent game classes own gameplay; the shared menu and controller support all six cartridges.
**Tech Stack:** HTML, CSS, vanilla JavaScript, Node for offline logic checks.

- [x] Add Meadow Run with scrolling physics, jump, run, collectibles, enemies and a finish.
- [x] Add Grove Quest with a walkable tile map, keys, directional combat and a shrine.
- [x] Add Critter Trail with exploration, encounters, turn-based battles, healing and collecting.
- [x] Expand the menu, cartridge descriptions and control hints to six games.
- [x] Test collision, progression, reachable objectives, win states, menu wrap and render compatibility.
- [x] Inspect new cartridges in the browser and the creature battle screen at 402 × 874.
