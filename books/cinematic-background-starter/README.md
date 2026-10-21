# Cinematic Background Lab

A lightweight animated website background built with HTML, CSS, and vanilla JavaScript.

## Run it

1. Extract the ZIP.
2. Open the `cinematic-background-starter` folder in VS Code.
3. Open `index.html` in a browser. If you use the VS Code Live Server extension, right-click `index.html` and choose **Open with Live Server**.

No package installation or build step is required.

## What to experiment with

- In `css/style.css`, change `--blue`, `--violet`, and `--night` to change the palette.
- Change the `19s` and `23s` animation durations to make the glows move more slowly or quickly.
- In `js/script.js`, change `particleCount` from `42` to `20` for a lighter effect or `60` for more particles.
- Change `particle.speed` to adjust how quickly particles float.
- Edit the heading and paragraph in `index.html`.

## Concepts to learn

- `position: fixed` and `z-index`: keep the scene behind content.
- `radial-gradient()`: create soft pools of light.
- `@keyframes`: move the glowing gradients.
- Canvas: draw and animate small particles.
- `requestAnimationFrame()`: schedule animation frames.
- `prefers-reduced-motion`: respect the visitor's motion preference.

This is a learning starter, not a production performance guarantee. Test it on the target device and browser.
