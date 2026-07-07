/**
 * Minimal polyfill for eftarkov.com template index.js
 * The original file is loaded from eftarkov.com's server and contains
 * the full Otsite runtime. This polyfill provides enough stubs for the
 * quest tree page to function standalone.
 */

// Core site namespace — used by global.js, xiaoguo.js, and inline scripts
window.Otsite = {
  IS_MOBILE: false,
  DYNAMIC_BACKGROUND: 'off',
  WALLPAPER_BACKGROUND_PC: false,
  THEME_URL: '',
  BIRTHDAY: '',
  MOTTO: '',
};

// Called in the main page's inline bottom script
function JsWriteBottom() {}

// Called by global.js on homepage
function WinLoadRun(_page) {}

// Called by various inline scripts
function newGoPage(_n) {}
