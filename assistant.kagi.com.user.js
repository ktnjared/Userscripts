// ==UserScript==
// @name        (KTN) Kagi Assistant
// @namespace   kagi-ctrl-shortcuts-macos
// @description Add CTRL shortcuts on macOS
// @author      ktnjared
// @version     20260705
// @run-at      document-start
// @grant       none
// @icon        https://www.google.com/s2/favicons?domain=assistant.kagi.com&sz=64
// @homepageURL https://github.com/ktnjared/userscripts/
// @downloadURL https://github.com/ktnjared/userscripts/raw/refs/heads/main/assistant.kagi.com.user.js
// @updateURL   https://github.com/ktnjared/userscripts/raw/refs/heads/main/assistant.kagi.com.user.js
// @match       https://kagi.com/assistant*
// @match       https://*.kagi.com/assistant*
// @match       https://assistant.kagi.com/*
// ==/UserScript==

(function () {
  'use strict';

  // keys used across all Kagi Assistant shortcuts
  const VALID_KEYS = new Set(['k', 's', 'c', 'e', 'backspace', '/', '.']);

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (!e.ctrlKey || e.metaKey || e.altKey || !VALID_KEYS.has(key)) return;

    // stop the browser/OS from handling Ctrl+K, Ctrl+/ etc.
    e.preventDefault();
    e.stopImmediatePropagation();

    // re-fire as a Cmd (metaKey) event, which is what Kagi listens for
    const synthetic = new KeyboardEvent('keydown', {
      key: e.key,
      code: e.code,
      metaKey: true,
      ctrlKey: false,
      shiftKey: e.shiftKey,
      altKey: false,
      bubbles: true,
      cancelable: true,
    });

    (e.target || document.activeElement || document.body).dispatchEvent(synthetic);
  }, true); // capture phase, so we intercept before the page does
})();

