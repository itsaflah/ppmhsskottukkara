# PPMHSS Kottukkara Website - Editing Guide

This website has been refactored to use a component-based structure for easier maintenance and code reuse.

## Project Structure

- **`common/`**: Contains shared components and assets.
    - `common.css`: Consolidated global styles (navbar, footer, typography, etc.).
    - `common.js`: Global JavaScript logic (loader, smooth scroll, etc.).
    - `navbar.html`: The navigation bar component.
    - `footer.html`: The footer component.
- **`index.html`**: The main homepage.
- **`about/`, `academics/`, `events/`, `gallery/`, `staffs/`**: Section-specific directories containing `index.html` and specific CSS.
- **`dist/`**: The generated "ready-to-deploy" website (created by `assemble.js`).
- **`assemble.js`**: Node.js script to build the site.

## How to Layout & Edit

### 1. Global Changes
To change the look or functionality of the entire site (e.g., changing the Navbar color or adding a Google Analytics script):
- Edit `common/common.css` or `common/common.js`.
- Edit `common/navbar.html` or `common/footer.html`.

### 2. Page-Specific Changes
To change content on a specific page (e.g., the Events list):
- Edit `events/index.html`.
- You will see markers like `<!-- include: ../common/navbar.html -->`. **Do not remove these** unless you intend to remove the component.
- Update the page-specific content as needed.

### 3. Adding a New Page
- Create a new folder (e.g., `news/`).
- Create `index.html` inside it.
- Add the include markers for navbar and footer.
- Link `../common/common.css` and `../common/common.js`.

## Building & Previewing

Because the source HTML files use special "include markers" (`<!-- include: ... -->`), opening them directly in a browser will **not** show the Navbar or Footer.

To preview the full site:
1.  Ensure you have **Node.js** installed.
2.  Open a terminal in the project root.
3.  Run the build script:
    ```bash
    node assemble.js
    ```
4.  This creates a `dist/` folder.
5.  Open `dist/index.html` (or any other file in `dist/`) in your browser to see the fully assembled site.

## Deprecated Files
Old or duplicated files have been moved to the `deprecated/` folder. You can safely delete this folder once you are confident in the new version.
