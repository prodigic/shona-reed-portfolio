# Portfolio Codebase - Technical Documentation

## Project Overview

This is a modern, static portfolio website for Shona Reed, a UX Researcher & Designer. The portfolio showcases professional work across various clients from startups to Fortune 500 companies. The site is built with vanilla JavaScript, semantic HTML5, and modern CSS, emphasizing performance, accessibility, and user experience.

**Live Site**: http://www.prodigic.com/shona-reed-portfolio/

## Architecture & Design Philosophy

### Core Principles
- **Vanilla JavaScript First**: No framework dependencies - pure ES6+ JavaScript for maximum control and minimal bundle size
- **Progressive Enhancement**: Core content accessible without JavaScript, enhanced with interactive features
- **Performance-Focused**: Lazy loading, minimal dependencies, optimized assets
- **Accessibility-First**: WCAG 2.1 AA compliant, keyboard navigation, semantic HTML
- **Mobile-First Responsive**: Fluid layouts that adapt from mobile to desktop

### Design Evolution
The repository contains two versions:
- **Legacy Version** (`index-old.html`, `main.js`): Original Tailwind-based design
- **Modern Version** (`index.html`, `main-modern.js`): Current 2026 design with custom CSS

## File Structure

```
shona-reed-portfolio/
├── index.html                    # Main entry point (modern design)
├── index-modern.html             # Modern design (identical to index.html)
├── index-old.html                # Legacy Tailwind version
├── package.json                  # Build tools configuration
├── tailwind.config.js            # Tailwind customization (legacy)
├── .gitignore                    # Git ignore patterns
├── README.md                     # User-facing documentation
├── DETAILS.md                    # Technical documentation (this file)
├── start-server.sh               # Shell script to start server with PID tracking
├── stop-server.sh                # Shell script to stop server gracefully
│
├── src/
│   ├── js/
│   │   ├── main-modern.js       # Modern portfolio JavaScript (530 lines)
│   │   └── main.js              # Legacy JavaScript (older version)
│   └── styles/
│       └── globals.css          # Tailwind imports & custom styles
│
├── dist/
│   ├── styles-modern.css        # Compiled modern CSS (982 lines)
│   └── styles.css               # Compiled legacy CSS
│
├── data/
│   └── projects.json            # Portfolio project data
│
└── assets/
    └── images/                  # Project images, logos, profile photo
```

### Git Ignored Files
The `.gitignore` file excludes:
- `.server.pid` - Server process ID file (created by start-server.sh)
- `node_modules/` - Node dependencies (if installed)
- `.DS_Store` - macOS system files
- Editor files - `.vscode/`, `.idea/`, etc.
- Build artifacts - Source maps
- Log files - `*.log`, `npm-debug.log*`

## Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with ARIA labels for accessibility
- **CSS3**: Modern CSS features including CSS Grid, Flexbox, Custom Properties (CSS Variables)
- **JavaScript ES6+**: Classes, async/await, modules, arrow functions, template literals
- **No frameworks**: Pure vanilla JavaScript for lightweight, fast loading

### Build Tools (Optional)
- **Tailwind CSS**: Utility-first CSS framework (used in legacy version)
- **http-server**: Simple development server
- **concurrently**: Run multiple npm scripts simultaneously

### Development Scripts
```json
{
  "dev": "concurrently \"npm run css:watch\" \"http-server -p 8080\"",
  "build": "tailwindcss -i ./src/styles/globals.css -o ./dist/styles.css --minify",
  "css:watch": "tailwindcss -i ./src/styles/globals.css -o ./dist/styles.css --watch",
  "serve": "http-server -p 8080",
  "start": "./start-server.sh",
  "stop": "./stop-server.sh"
}
```

### Server Management Scripts

The project includes shell scripts for better server lifecycle management:

**`start-server.sh`**:
- Starts http-server with configurable PORT (defaults to 8080)
- Saves server PID to `.server.pid` file
- Displays server information (PID, URL)
- Usage: `./start-server.sh` or `PORT=3000 ./start-server.sh`

**`stop-server.sh`**:
- Gracefully stops the running server using saved PID
- Cleans up `.server.pid` file
- Error handling for missing/dead processes
- Usage: `./stop-server.sh`

These scripts can be run directly or via npm:
- `npm start` - Start server (use `PORT=3000 npm start` for custom port)
- `npm stop` - Stop server

## JavaScript Implementation

### Main Class: `ModernPortfolio`

The entire application is encapsulated in a single ES6 class at `src/js/main-modern.js:2-525`.

#### Constructor & State Management
```javascript
class ModernPortfolio {
    constructor() {
        this.projects = [];              // Array of project objects from JSON
        this.currentProject = null;       // Currently open project in modal
        this.currentImageIndex = 0;       // Current image in gallery
        this.isModalOpen = false;         // Modal state flag
    }
}
```

#### Initialization Flow
**Entry Point**: `src/js/main-modern.js:528-538`
```javascript
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
    // Fade-in animation on page load
});
```

**Initialization Method**: `src/js/main-modern.js:12-19`
1. Load project data from JSON
2. Render project grid
3. Setup event listeners (clicks, keyboard, scroll)
4. Setup navigation behavior
5. Setup scroll effects (parallax, animations)
6. Setup CSS animations

### Key Features Implementation

#### 1. Dynamic Project Loading
**Method**: `loadProjects()` at `src/js/main-modern.js:21-29`
- Fetches `data/projects.json` asynchronously
- Graceful error handling with empty array fallback
- Uses modern `async/await` syntax

#### 2. Project Grid Rendering
**Method**: `renderProjectGrid()` at `src/js/main-modern.js:31-67`
- Generates HTML using template literals
- Staggered animation delays (`${index * 0.1}s`)
- Lazy loading images with `loading="lazy"` attribute
- Truncates descriptions to 120 characters with ellipsis
- Event delegation for click handling (single listener on grid)

#### 3. Intersection Observer for Scroll Animations
**Method**: `observeProjectCards()` at `src/js/main-modern.js:69-84`
- Uses native Intersection Observer API
- Triggers `fadeInUp` animation when cards enter viewport
- Threshold: 0.1 (triggers when 10% visible)
- More performant than scroll event listeners

#### 4. Full-Screen Modal System
**Opening**: `openModal(projectId)` at `src/js/main-modern.js:86-93`
- Finds project by ID
- Resets image index to 0
- Renders modal content
- Shows modal with animation

**Rendering**: `renderModal()` at `src/js/main-modern.js:95-183`
- Color-themed modal sections using project-specific CSS classes
- Dynamic client logo display
- Image gallery with thumbnails
- Inline images for mobile via CSS custom properties
- Template literal HTML generation

**Closing**: `closeModal()` at `src/js/main-modern.js:279-289`
- Removes modal visibility
- Resets scroll on body element
- Clears current project state

#### 5. Image Gallery Navigation
**Keyboard Support**: `handleKeyNavigation()` at `src/js/main-modern.js:198-212`
- `Escape`: Close modal
- `ArrowLeft`: Previous image
- `ArrowRight`: Next image

**Thumbnail Navigation**: `setupModalImageNavigation()` at `src/js/main-modern.js:185-196`
- Click on thumbnails to jump to specific image
- Border highlighting for active thumbnail

**Image Updates**: `updateModalImage()` at `src/js/main-modern.js:241-265`
- Smooth opacity transitions (0.7 → 1)
- Updates both desktop image and mobile inline background
- Thumbnail border color updates

#### 6. Theme System (Dark/Light Mode)
**Initialization**: `initializeTheme()` at `src/js/main-modern.js:473-489`
- Checks localStorage for saved preference
- Falls back to system preference (`prefers-color-scheme`)
- Defaults to dark mode if no preference

**Toggle**: `toggleTheme()` at `src/js/main-modern.js:491-511`
- Adds/removes `light-theme` class on `<html>` element
- Saves preference to localStorage
- Smooth 0.3s transition effect

#### 7. Navigation Behavior
**Scroll-Responsive Nav**: `setupNavigation()` at `src/js/main-modern.js:352-371`
- Hides navigation on scroll down (past 100px)
- Shows navigation on scroll up
- Updates active link based on scroll position

**Smooth Scrolling**: Event listener at `src/js/main-modern.js:330-344`
- Intercepts anchor link clicks
- Smooth scroll to section with 80px offset for fixed nav
- Uses native `scrollTo` with `behavior: 'smooth'`

#### 8. Scroll Effects
**Hero Parallax**: `setupScrollEffects()` at `src/js/main-modern.js:395-428`
- Hero section moves at -0.5 rate of scroll
- Creates depth illusion
- Only active when hero is in viewport

**Fade-in Animations**: Uses Intersection Observer
- Observes sections (`.about`, `.section-header`)
- Triggers `fadeInUp` animation on intersection
- Root margin: `0px 0px -50px 0px` (triggers before fully visible)

#### 9. Utility Functions
**Debounce**: `debounce(func, wait)` at `src/js/main-modern.js:514-524`
- Limits function execution frequency
- Used for window resize handler
- Classic debounce implementation with setTimeout

## Data Model

### Project Schema (`data/projects.json`)

Each project object contains:

```javascript
{
  "id": "string",              // Unique identifier (used for URL/routing)
  "title": "string",           // Project display title
  "client": "string",          // Client company name
  "role": "string",            // Designer's role on project
  "tags": ["string"],          // Technology/skill tags
  "description": "string",     // Full project description
  "thumbnail": "string",       // Grid thumbnail image filename
  "clientLogo": "string",      // Client logo filename (optional)
  "images": ["string"],        // Array of project image filenames
  "projectDate": "string",     // Date or year of project
  "modalId": number           // Used for CSS color theming (1-6)
}
```

**Current Projects**: 6 projects spanning 2010-2015
- UX is Ready (consultancy)
- Snapfish Photos Prints
- Snapfish Checkout
- Bluewolf (CRM)
- Bank of America (online banking)
- Academy Of Art University (e-learning)

## Styling Architecture

### CSS Custom Properties (CSS Variables)

The modern design uses CSS variables for theming (defined in `dist/styles-modern.css`):

```css
:root {
  /* Colors */
  --color-bg: #0a0a0a;                    /* Dark background */
  --color-surface: #141414;               /* Card/surface color */
  --color-text: #ffffff;                  /* Primary text */
  --color-text-secondary: #b3b3b3;        /* Secondary text */
  --color-accent: #ff006e;                /* Hot pink accent */
  --color-border: #2a2a2a;                /* Border color */

  /* Typography */
  --font-sans: 'Inter', -apple-system, system-ui;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Effects */
  --blur: 20px;
  --transition: 0.3s ease;
}

.light-theme {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #0a0a0a;
  --color-text-secondary: #666666;
  --color-border: #e5e5e5;
}
```

### Modal Color Theming

Each project has a unique color scheme applied via `modalId`:

```css
.modal-info-section.project-1 { --color-accent: #ff006e; }  /* Hot pink */
.modal-info-section.project-2 { --color-accent: #8338ec; }  /* Purple */
.modal-info-section.project-3 { --color-accent: #ffbe0b; }  /* Yellow */
.modal-info-section.project-4 { --color-accent: #fb5607; }  /* Orange */
.modal-info-section.project-5 { --color-accent: #06ffa5; }  /* Teal */
.modal-info-section.project-6 { --color-accent: #3a86ff; }  /* Blue */
```

### Layout Systems

#### CSS Grid (Project Grid)
```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
```

#### Flexbox (Navigation, Hero, Modal)
- Navigation: `display: flex; justify-content: space-between;`
- Hero: Two-column flex layout
- Modal: Split-screen flex layout (image | content)

### Responsive Breakpoints

**Mobile First Approach**:
- Base: Mobile (< 640px)
- `@media (min-width: 640px)`: Small tablets
- `@media (min-width: 768px)`: Tablets
- `@media (min-width: 1024px)`: Desktop
- `@media (min-width: 1280px)`: Large desktop

### Mobile-Specific Features

**Modal Layout** (at `src/js/main-modern.js:115`):
- Desktop: Side-by-side image and content
- Mobile: Content with inline background image
- Uses CSS custom property `--modal-image-url` for mobile background
- Switched via media query

**Navigation**:
- Desktop: Horizontal nav links
- Mobile: Hamburger menu toggle

## Accessibility Features

### WCAG 2.1 AA Compliance

1. **Color Contrast**: All text meets minimum contrast ratios
   - Dark mode: White text (#ffffff) on dark backgrounds
   - Light mode: Dark text (#0a0a0a) on light backgrounds
   - Accent colors chosen for sufficient contrast

2. **Semantic HTML**:
   - `<nav>` for navigation
   - `<header>` for hero section
   - `<section>` with IDs for main content areas
   - `<article>` for project cards
   - `<button>` for interactive elements (not divs)

3. **ARIA Labels**:
   - `aria-label="Close modal"` on modal close button
   - `aria-label="Toggle dark/light mode"` on theme toggle
   - `aria-label="LinkedIn"` on social links (no visible text)

4. **Keyboard Navigation**:
   - Tab through interactive elements
   - Enter/Space to activate buttons
   - Arrow keys for image gallery
   - Escape to close modal

5. **Focus Management**:
   - Visible focus indicators on all interactive elements
   - Focus trapped in modal when open

6. **Alt Text**:
   - All images have descriptive alt attributes
   - Decorative SVG icons use `aria-label` on parent elements

## Performance Optimizations

### Image Optimization
1. **Lazy Loading**: `loading="lazy"` attribute on all grid images
2. **Responsive Images**: Appropriately sized thumbnails vs full images
3. **Format**: PNG for UI, SVG for logos/icons

### JavaScript Performance
1. **Event Delegation**: Single click listener on grid instead of per-card listeners
2. **Intersection Observer**: More efficient than scroll event listeners
3. **Debouncing**: Window resize events debounced to 250ms
4. **Minimal DOM Manipulation**: Batch updates, template literals for efficiency

### CSS Performance
1. **CSS Custom Properties**: Reduces repeated color values
2. **CSS-Only Animations**: Where possible, prefer CSS over JS animations
3. **Hardware Acceleration**: `transform` and `opacity` for smooth animations
4. **Efficient Selectors**: Class-based selectors, avoid deep nesting

### Loading Strategy
1. **Critical CSS**: Inline critical styles in future optimization
2. **Deferred JavaScript**: Script at end of body
3. **Font Loading**: Google Fonts with `display=swap`

## Browser Compatibility

### Modern Browser Features Used
- **ES6+ JavaScript**: Classes, arrow functions, template literals, async/await
- **CSS Grid**: For project grid layout
- **CSS Custom Properties**: For theming
- **Intersection Observer API**: For scroll animations
- **Fetch API**: For loading JSON data
- **LocalStorage**: For theme persistence
- **CSS `backdrop-filter`**: For blur effects (progressive enhancement)

### Browser Support
- Chrome/Edge: Full support (latest)
- Firefox: Full support (latest)
- Safari: Full support (latest)
- Mobile browsers: iOS Safari 12+, Chrome Mobile

### Fallbacks
- Intersection Observer: Graceful degradation (animations skip)
- CSS Grid: Flexbox fallback possible
- Custom properties: Fallback values in legacy version

## Development Workflow

### Local Development
```bash
# Clone repository
git clone [repo-url]
cd shona-reed-portfolio

# Option 1: Start server with PID tracking (recommended)
npm start
# Opens at http://localhost:8080
# PID saved to .server.pid for easy stopping

# With custom port
PORT=3000 npm start

# Stop the server
npm stop
# Or: ./stop-server.sh

# Option 2: Start development server with CSS watching
npm run dev
# Opens at http://localhost:8080
# Stop with Ctrl+C

# Option 3: Serve static files only
npm run serve
# Opens at http://localhost:8080
# Stop with Ctrl+C
```

### Server Management
The project includes dedicated shell scripts for server lifecycle management:

**Starting the server:**
- `./start-server.sh` - Default port 8080
- `PORT=3000 ./start-server.sh` - Custom port
- Server PID automatically saved to `.server.pid`

**Stopping the server:**
- `./stop-server.sh` - Gracefully stops using saved PID
- `npm stop` - Same as above via npm

**Benefits:**
- No need to find process manually
- Works across terminal sessions
- Clean shutdown and cleanup
- Custom port configuration

### Building for Production
```bash
# Compile and minify CSS
npm run build

# Output: dist/styles.css (minified)
```

### Deployment
- **Platform**: GitHub Pages
- **URL Structure**: `https://prodigic.github.io/shona-reed-portfolio/`
- **Build**: Static files, no build step required
- **Custom Domain**: http://www.prodigic.com/shona-reed-portfolio/

### Git Workflow
Recent commits show development progression:
1. `977bc94`: Mobile modal inline image layout
2. `3168765`: Comprehensive mobile breakpoint fixes
3. `2ef4f50`: GitHub Pages deployment configuration
4. `b010425`: Added README documentation
5. `64d9416`: Enhanced modal UI and accessibility

## Key Code Patterns

### Template Literal HTML Generation
Used throughout for dynamic content creation:
```javascript
grid.innerHTML = this.projects.map((project, index) => `
    <article class="project-card" data-project-id="${project.id}">
        <img src="assets/images/${project.thumbnail}" alt="${project.title}">
        <h3>${project.title}</h3>
    </article>
`).join('');
```

### Event Delegation Pattern
Efficient event handling:
```javascript
grid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (card) {
        const projectId = card.getAttribute('data-project-id');
        this.openModal(projectId);
    }
});
```

### Intersection Observer Pattern
Modern scroll-based animations:
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationName = 'fadeInUp';
        }
    });
}, { threshold: 0.1 });
```

### LocalStorage Theme Persistence
```javascript
// Save
localStorage.setItem('theme', 'dark');

// Load
const savedTheme = localStorage.getItem('theme');

// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

## Future Enhancement Opportunities

### Potential Improvements
1. **Progressive Web App**: Add service worker for offline support
2. **Image Optimization**: WebP format with fallbacks
3. **Code Splitting**: Lazy load modal code
4. **Critical CSS**: Inline above-the-fold styles
5. **Analytics**: Add privacy-friendly analytics
6. **Contact Form**: Add working contact form with backend
7. **Blog Section**: Add case studies or blog posts
8. **Filtering**: Add tag-based project filtering
9. **Search**: Add project search functionality
10. **Animations**: Add more micro-interactions

### Accessibility Enhancements
1. **Screen Reader Testing**: Test with NVDA, JAWS, VoiceOver
2. **High Contrast Mode**: Ensure compatibility with Windows High Contrast
3. **Reduced Motion**: Respect `prefers-reduced-motion` media query
4. **Focus Indicators**: Enhance focus styling for better visibility

## Testing Checklist

### Functional Testing
- [ ] All projects load correctly
- [ ] Modal opens and closes
- [ ] Image gallery navigation works
- [ ] Theme toggle persists across page loads
- [ ] Smooth scrolling works on all browsers
- [ ] Mobile navigation menu toggles
- [ ] Keyboard navigation functional
- [ ] External links open in new tabs

### Responsive Testing
- [ ] Mobile (320px - 640px)
- [ ] Tablet (641px - 1024px)
- [ ] Desktop (1025px+)
- [ ] Landscape orientation
- [ ] Touch interactions on mobile

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No layout shifts (CLS score)

### Accessibility Testing
- [ ] WAVE tool (no errors)
- [ ] Keyboard-only navigation
- [ ] Screen reader testing
- [ ] Color contrast validation
- [ ] Focus management in modal

---

**Last Updated**: February 1, 2026
**Author**: Technical documentation for Shona Reed Portfolio
**Version**: 1.0.0
