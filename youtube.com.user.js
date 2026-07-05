// ==UserScript==
// @name        (KTN) youtube.com
// @description (KTN) youtube.com
// @author      ktnjared
// @version     20260705
// @run-at      document-start
// @grant       GM_addStyle
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @homepageURL https://github.com/ktnjared/userscripts/
// @downloadURL https://github.com/ktnjared/userscripts/raw/refs/heads/main/youtube.com.user.js
// @updateURL   https://github.com/ktnjared/userscripts/raw/refs/heads/main/youtube.com.user.js
// @match       *://*.youtube.com/*
// @match       *://*.youtube/*
// @match       *://youtu.be/*
// @match       *://youtube.com/*
// ==/UserScript==

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║ HIDE RULES                                                            ║
// ╚═══════════════════════════════════════════════════════════════════════╝
const HIDE_SELECTORS = [
    '.style-scope.ytd-menu-renderer.force-icon-button.style-text',
    '*[id*="footer"]:has(*[id="copyright"])',
    'button[aria-label="Clip"]',
    'button[aria-label="Download"]',
    'button[aria-label="Join this channel"]',
    'button[aria-label="Thanks"]',
    'yt-button-view-model:has(path[d="M480-80q0-83-31.5-156T363-363q-54-54-127-85.5T80-480q83 0 156-31.5T363-597q54-54 85.5-127T480-880q0 83 31.5 156T597-597q54 54 127 85.5T880-480q-83 0-156 31.5T597-363q-54 54-85.5 127T480-80Z"])',
    'ytd-guide-entry-renderer:has(a[href*="music.youtube"])',
    'ytd-guide-entry-renderer:has(a[href="/feed/clips"])',
    'ytd-guide-entry-renderer:has(a[href="/feed/downloads"])',
    'ytd-guide-entry-renderer:has(a[href="/feed/history"])',
    'ytd-guide-entry-renderer:has(a[href="/playlist?list=LL"])',
    'ytd-guide-entry-renderer:has(a[title="Your movies & TV"])',
    'ytd-guide-entry-renderer:has(a[title="Your videos"])',
    'ytd-guide-entry-renderer:has(a[title~="Shorts"])',
    'ytd-guide-entry-renderer:has(youtube.com##a[href="/feed/channels"])',
    'ytd-guide-entry-renderer:has(youtube.com##a[title="Show more"])',
    'ytd-guide-entry-renderer:has(yt-formatted-string:contains("Explore"))',
    'ytd-guide-entry-renderer[line-end-style="dot"]',
    'ytd-item-section-renderer.style-scope.ytd-section-list-renderer:has(*[title-style="ITEM_SECTION_HEADER_TITLE_STYLE_PLAYLIST_RECOMMENDATIONS"])',
];

GM_addStyle(
    HIDE_SELECTORS.map((sel) => `${sel} { display: none !important; }`).join('\n')
);

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║ KEYBOARD SHORTCUTS                                                    ║
// ╚═══════════════════════════════════════════════════════════════════════╝
const isTypingTarget = (el) => {
    const tag = (el.tagName || '').toLowerCase();
    return tag === 'input' || tag === 'textarea' || el.isContentEditable;
};

const SHORTCUTS = [
    {
        match: (e) => e.altKey && e.code === 'Equal',
        run: () => {
            const likeButton =
                document.querySelector('like-button-view-model button') ||
                document.querySelector('#segmented-like-button button');
            likeButton?.click();
        },
    },
];

document.addEventListener('keydown', (e) => {
    if (isTypingTarget(e.target)) return;
    const shortcut = SHORTCUTS.find((s) => s.match(e));
    if (!shortcut) return;
    e.preventDefault();
    shortcut.run();
}, true);
