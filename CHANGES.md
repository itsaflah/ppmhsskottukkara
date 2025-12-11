# Refactor Changes Log

**Date:** 2025-12-11
**Branch:** `refactor/commons-20251211-1628`

## Summary
Performed a full automated cleanup and consolidation of the website template to reduce code duplication and improve maintainability.

## Detailed Changes

### 1. CSS Consolidation
- **Created** `common/common.css`: Consolidates shared styles from `styles.css`, `about/about.css`, and `common/commonstyle.css`. Includes Root variables, Navbar, Footer, Animations, and Utility classes.
- **Updated** `styles.css` and `about/about.css`: Removed duplicated code, keeping only page-specific overrides.
- **Deprecated** `common/commonstyle.css`: Moved to `deprecated/commonstyle_old.css` as it is now redundant.

### 2. JavaScript Centralization
- **Moved** `script.js` (root) to `common/common.js`.
- **Updated** logic in `common.js` to be robust against missing placeholders.

### 3. HTML Templating
- **Replaced** duplicated header/footer HTML code in all pages with include markers:
    - `<!-- include: common/navbar.html -->`
    - `<!-- include: common/footer.html -->`
- **Updated Links**: All HTML files now correctly point to `common/common.css` and `common/common.js`.
- **Affected Files**:
    - `index.html`
    - `about/index.html`
    - `academics/index.html`
    - `events/index.html`
    - `gallery/index.html`
    - `staffs/index.html`

### 4. Build System
- **Created** `assemble.js`: A zero-dependency Node.js script.
    - Scans the source directory.
    - Replaces `<!-- include: ... -->` markers with the actual content of the referenced file.
    - Outputs the fully assembled site to `dist/`.

## Next Steps
- Review `dist/` to ensure site looks correct.
- Deploy the contents of `dist/` to production.
