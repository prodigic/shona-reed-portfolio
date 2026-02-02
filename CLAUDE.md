# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Context

This is a **static portfolio website** built with vanilla JavaScript, HTML5, and CSS3. No build frameworks (React, Vue, etc.) are used. The site is deployed to GitHub Pages at http://www.prodigic.com/shona-reed-portfolio/.

**Two versions exist:**
- **Modern** (active): `index.html`, `src/js/main-modern.js`, `dist/styles-modern.css`
- **Legacy**: `index-old.html`, `src/js/main.js`, `dist/styles.css`

When making changes, work on the **modern version** unless explicitly told otherwise.

## Development Commands

### Running the Server

**Recommended method** (with PID tracking for easy stopping):
```bash
npm start                 # Start on default port 8080
PORT=3000 npm start      # Start on custom port
npm stop                 # Stop the server
```

**Alternative methods:**
```bash
npm run serve            # Static file server (stop with Ctrl+C)
npm run dev              # Server + CSS watching (stop with Ctrl+C)
```

### Building CSS

This project uses Tailwind CSS for the legacy version only. Modern version uses pre-compiled CSS.

```bash
npm run build            # Compile and minify CSS for legacy version
npm run css:watch        # Watch mode for CSS changes
```

### Opening in Browser

```bash
open -a "Google Chrome" index.html     # macOS Chrome
open index.html                        # Default browser
```

Note: Some features (JSON loading) require a server due to CORS restrictions.

## Architecture Overview

### Single-Class Application Pattern

The entire modern portfolio is a **single ES6 class** (`ModernPortfolio`) at `src/js/main-modern.js`. All state and functionality are encapsulated here.

**Key state:**
```javascript
this.projects = []              // Loaded from data/projects.json
this.currentProject = null      // Currently open modal project
this.currentImageIndex = 0      // Gallery navigation state
this.isModalOpen = false        // Modal visibility state
```

**Initialization flow:**
1. Load `data/projects.json` via fetch
2. Render project grid with event delegation
3. Setup global event listeners (scroll, keyboard, clicks)
4. Initialize Intersection Observer for scroll animations
5. Load theme from localStorage

### Data-Driven Project System

**All portfolio content** comes from `data/projects.json`. The JSON schema:
```javascript
{
  "id": "string",              // Used for routing/identification
  "title": "string",           // Display title
  "client": "string",          // Client name
  "role": "string",            // Designer role
  "tags": ["string"],          // Skills/technologies
  "description": "string",     // Full description
  "thumbnail": "filename.png", // Grid image (in assets/images/)
  "clientLogo": "logo.png",    // Optional client logo
  "images": ["img1.png"],      // Gallery images
  "projectDate": "string",     // Date/year
  "modalId": 1-6              // Color theme ID for modal
}
```

To add/edit projects: **modify `data/projects.json` only**. The UI updates automatically.

### Modal Color Theming System

Each project has a `modalId` (1-6) that maps to color schemes in CSS:
- Project 1: Hot pink (#ff006e)
- Project 2: Purple (#8338ec)
- Project 3: Yellow (#ffbe0b)
- Project 4: Orange (#fb5607)
- Project 5: Teal (#06ffa5)
- Project 6: Blue (#3a86ff)

CSS applies colors via `.modal-info-section.project-{modalId}` classes. When adding new projects, reuse existing modalIds (1-6) to maintain consistent theming.

### CSS Custom Properties Architecture

The modern design uses CSS variables extensively for theming. All colors, spacing, and effects are defined in `:root` with overrides in `.light-theme` class.

**Theme switching**: JavaScript toggles `.light-theme` class on `<html>` element. Preference saved to localStorage.

**Key variables:**
- `--color-accent`: Primary accent color (changes per modal project)
- `--color-bg`: Background color (dark/light mode)
- `--color-text`: Text color
- `--spacing-*`: Consistent spacing scale

### Event Patterns

**Event delegation** is used for efficiency:
```javascript
// Single listener on grid, not per card
grid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (card) { /* handle */ }
});
```

**Intersection Observer** for scroll animations (not scroll listeners):
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animation
        }
    });
}, { threshold: 0.1 });
```

**Keyboard navigation** is centralized in `handleKeyNavigation()`:
- Escape: Close modal
- Arrow Left/Right: Navigate gallery

## File Locations

### Where to Make Changes

**JavaScript logic**: `src/js/main-modern.js` (lines 2-525)
- All interactivity lives in the `ModernPortfolio` class
- Methods are well-named and documented in DETAILS.md

**HTML structure**: `index.html` or `index-modern.html` (identical files)
- Semantic HTML5 with ARIA labels
- Modal structure at lines 156-172

**Styling**: `dist/styles-modern.css` (982 lines, pre-compiled)
- CSS custom properties defined at top
- Modal color themes defined with `.project-{N}` classes

**Portfolio content**: `data/projects.json`
- Add/edit/remove projects here
- Images must exist in `assets/images/`

**Images**: `assets/images/`
- Project thumbnails, gallery images, logos
- Use PNG for photos, SVG for logos

### Key Method Locations

Reference these when modifying functionality:
- Project loading: `loadProjects()` at line 21
- Grid rendering: `renderProjectGrid()` at line 31
- Modal opening: `openModal(projectId)` at line 86
- Modal rendering: `renderModal()` at line 95
- Image navigation: `updateModalImage()` at line 241
- Theme toggling: `toggleTheme()` at line 491
- Scroll effects: `setupScrollEffects()` at line 395

## Accessibility Requirements

This portfolio is **WCAG 2.1 AA compliant**. When making changes:

- All interactive elements must be keyboard accessible
- Maintain color contrast ratios (check dark AND light modes)
- Add ARIA labels to icon-only buttons
- Use semantic HTML (`<nav>`, `<article>`, `<button>`, not `<div>`)
- Test modal focus trapping (focus should stay in modal when open)
- Images need descriptive alt text

## Mobile-First Responsive Design

Breakpoints (mobile-first):
- Base: < 640px (mobile)
- 640px: Small tablets
- 768px: Tablets
- 1024px: Desktop
- 1280px: Large desktop

**Modal behavior differs by device:**
- Desktop: Side-by-side image and content
- Mobile: Content with inline background image (CSS custom property `--modal-image-url`)

Media queries are in `dist/styles-modern.css`.

## Deployment

**Platform**: GitHub Pages
**Branch**: `main` (auto-deploys)
**URLs**:
- http://www.prodigic.com/shona-reed-portfolio/
- https://prodigic.github.io/shona-reed-portfolio/

**Deployment process:**
1. Push to `main` branch
2. GitHub Actions auto-deploys
3. No build step required (static files)

## Common Patterns

### Adding a New Project

1. Add project object to `data/projects.json` with all required fields
2. Add images to `assets/images/` (thumbnail + gallery images)
3. Assign `modalId` (1-6) for color theme
4. Test modal, gallery navigation, and responsive layout

### Modifying Styles

Modern version uses pre-compiled CSS. To modify:
1. Edit `dist/styles-modern.css` directly (no build step)
2. OR edit `src/styles/globals.css` and run `npm run build` (legacy Tailwind workflow)

For consistency, prefer editing `dist/styles-modern.css` directly.

### Debugging Modal Issues

Common issues:
- **Image not loading**: Check filename matches exactly in `projects.json` and exists in `assets/images/`
- **Wrong color theme**: Verify `modalId` is 1-6 and CSS class `.project-{N}` exists
- **Modal won't close**: Check `isModalOpen` state and event listener on overlay
- **Gallery navigation broken**: Verify `images` array exists and `currentImageIndex` is valid

### Template Literal HTML Generation

The codebase uses template literals extensively for DOM generation:
```javascript
element.innerHTML = data.map(item => `
    <div>${item.property}</div>
`).join('');
```

When adding new dynamic content, follow this pattern for consistency.

## Performance Considerations

- Images use `loading="lazy"` attribute (already implemented)
- Intersection Observer for animations (more performant than scroll listeners)
- Event delegation reduces listener count
- CSS transforms/opacity for hardware-accelerated animations
- Minimal JavaScript footprint (no frameworks)

## Browser Compatibility

Requires modern browser features:
- ES6+ (classes, arrow functions, async/await, template literals)
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- Fetch API
- LocalStorage

Supports: Chrome/Edge, Firefox, Safari (latest), iOS Safari 12+, Chrome Mobile

## Testing Checklist

No automated tests exist. Manual testing required:

**Functional:**
- [ ] All projects load and display
- [ ] Modal opens/closes correctly
- [ ] Image gallery navigation (thumbnails, arrows, keyboard)
- [ ] Theme toggle persists after reload
- [ ] Smooth scrolling works
- [ ] External links open in new tabs

**Responsive:**
- [ ] Mobile (320px-640px): Single column, inline modal images
- [ ] Tablet (641px-1024px): 2-column grid
- [ ] Desktop (1025px+): Full layout with hover effects

**Accessibility:**
- [ ] Keyboard-only navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present on icon buttons
- [ ] Color contrast passes (both themes)

**Performance:**
- [ ] Lighthouse score > 90
- [ ] Images lazy load
- [ ] No console errors

## Known Constraints

- **No test suite**: Manual testing required for all changes
- **No linting**: No ESLint or Prettier configured
- **No CI/CD**: Only GitHub Pages auto-deployment
- **No TypeScript**: Pure JavaScript, no type safety
- **No module bundler**: Single JS file, no code splitting

When suggesting improvements, be aware of these constraints.
