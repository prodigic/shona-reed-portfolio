# Transform Portfolio: Vibrant to Minimal Research-Focused Design

## Context

The current Shona Reed portfolio uses a vibrant, modern aesthetic with hot pink-to-purple gradients, colorful project cards, and animated interactions. Based on the analysis of Tessa Merrie's portfolio (a fellow UX researcher), we're transforming this to a **minimal, content-first, research-focused approach** that emphasizes:

- **Professional credibility** through design restraint
- **Research methodology** as primary positioning
- **Neutral grayscale palette** where project imagery provides color
- **Structured skills taxonomy** demonstrating expertise
- **Academic/professional tone** over commercial appeal

This transformation maintains the clean single-class JavaScript architecture, responsive design, and WCAG AA accessibility while significantly reducing visual complexity.

---

## Implementation Approach

### Phase 1: Color Palette Transformation (Foundation)
**Priority**: Critical - affects all downstream changes

Transform from vibrant gradients to neutral grayscale:

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`

1. **Update CSS Variables (Lines 16-87)**:
   ```css
   /* Dark Mode - Neutral */
   --color-accent: #de0f66 → #4a4a4a (neutral gray)
   --color-accent-hover: #333333

   /* Remove vibrant accents */
   --color-accent-secondary: REMOVE
   --color-accent-yellow: REMOVE
   --gradient-primary: REMOVE
   --gradient-soft: REMOVE
   ```

2. **Remove Gradient Backgrounds**:
   - Hero background (Lines 341-344): Replace radial gradients with solid `var(--color-bg-primary)`
   - Hero title (Lines 375-379): Remove gradient text, use solid `var(--color-text-primary)`
   - Button primary (Lines 408-418): Replace gradient with solid background + border
   - Project cards (Lines 574-597): Remove all nth-child pastel gradients
   - Modal color themes (Lines 987-1009): Remove all `.project-{N}` gradient backgrounds

3. **Neutralize Tags & Interactive Elements (Lines 660-695)**:
   ```css
   .project-tag {
     background: transparent;
     color: var(--color-text-secondary);
     border: 1px solid var(--color-border);
   }
   ```

**Test**: Both dark and light modes maintain WCAG AA contrast ratios.

---

### Phase 2: Typography Simplification
**Priority**: High - establishes content hierarchy

Replace decorative serif with professional sans-serif throughout:

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`

1. **Update Font Imports (Line 2)**: Remove Playfair Display, keep only IBM Plex Sans
2. **Update Font Variables (Lines 39-41)**:
   ```css
   --font-display: 'IBM Plex Sans', sans-serif; /* Was Playfair */
   --font-body: 'IBM Plex Sans', sans-serif;
   --font-mono: 'IBM Plex Sans', sans-serif; /* Was JetBrains Mono */
   ```
3. **Adjust Heading Sizes (Lines 120-123)**: Slightly reduce clamp maximums for sans-serif
4. **Weight Hierarchy**: Use IBM Plex Sans weights (300, 400, 500, 600, 700) for visual hierarchy

**Test**: Headings are distinguishable by size/weight alone without decorative fonts.

---

### Phase 3: Add Skills Taxonomy Section
**Priority**: High - core research positioning content

Add structured skills section between About and Work:

**File**: `/Users/shonareed/Code/shona-reed-portfolio/index.html` (after line 109)

Add new section:
```html
<!-- Skills & Expertise Section -->
<section id="skills" class="skills">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Skills & Expertise</h2>
            <p class="section-subtitle">
                Research methodologies and design capabilities spanning
                planning, field research, and execution.
            </p>
        </div>

        <div class="skills-grid">
            <div class="skill-category">
                <h3>Research Planning</h3>
                <ul class="skill-list">
                    <li>Research strategy development</li>
                    <li>Study design & scoping</li>
                    <li>Stakeholder alignment</li>
                    <li>Research questions formulation</li>
                </ul>
            </div>
            <!-- 3 more categories: Field Research, Analysis & Synthesis, Design & Validation -->
        </div>
    </div>
</section>
```

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`

Add CSS for skills grid:
```css
.skills {
  padding: var(--spacing-xl) 0;
  background: var(--color-bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.skill-category {
  background: var(--color-bg-primary);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
}

.skill-list li::before {
  content: '•';
  color: var(--color-text-tertiary);
}
```

**Update Navigation**:
- **HTML** (Lines 16-22): Change "Work" to "Research", add "Skills" link, remove "Thoughts" and "Book"
- **JavaScript** `/Users/shonareed/Code/shona-reed-portfolio/src/js/main-modern.js` (Line 383):
  ```javascript
  const sections = ['about', 'skills', 'work', 'contact']; // Updated
  ```

**Test**: Skills section displays in responsive grid, navigation highlighting works.

---

### Phase 4: Update Content for Research Positioning

**File**: `/Users/shonareed/Code/shona-reed-portfolio/index.html`

1. **Hero Section (Lines 49-81)**: Update subtitle and description
   ```html
   <div class="hero-subtitle">UX Research & Design</div>
   <p class="hero-description">
       I lead user research and design projects that transform insights
       into products people genuinely need and want to use. My work spans
       ethnographic research, usability studies, and interface design.
   </p>
   ```

2. **About Section (Lines 84-109)**: Emphasize research methodologies
   - Focus on "qualitative research methodologies" and "ethnographic research"
   - Mention "in-depth interviews, contextual inquiry, observational studies"
   - Keep Fortune 500 + startups positioning

3. **Work Section Title (Lines 114-119)**: Change to "Research & Design Work"

**Test**: Content reads professionally and emphasizes research expertise.

---

### Phase 5: Simplify Project Presentation

#### A. Project Cards

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css` (Lines 562-616)

Remove visual complexity:
```css
.project-card {
  background: var(--color-bg-secondary);
  border-radius: 0; /* Remove rounded corners */
  border: 1px solid var(--color-border);
  transition: border-color 0.2s ease;
}

.project-card:hover {
  border-color: var(--color-text-primary);
  /* Remove transform and shadow */
}

.project-image {
  transform: none; /* Remove zoom effect */
}
```

#### B. Modal System

**File**: `/Users/shonareed/Code/shona-reed-portfolio/src/js/main-modern.js`

1. **Remove Color Theming (Lines 103-107)**:
   ```javascript
   // Remove this logic:
   if (project.modalId) {
       modalInfoSection.classList.add(`project-${project.modalId}`);
   }
   ```

2. **Add Methodology Display (Lines 140 area)**: Insert after client logo, before tags
   ```javascript
   ${project.methodology && project.methodology.length > 0 ? `
       <div style="margin-bottom: 2rem;">
           <h4 class="methodology-label">Research Methods</h4>
           <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
               ${project.methodology.map(method => `
                   <span class="methodology-tag">${method}</span>
               `).join('')}
           </div>
       </div>
   ` : ''}
   ```

**File**: `/Users/shonareed/Code/shona-reed-portfolio/data/projects.json`

Add methodology field to each project:
```json
{
  "id": "uxisready",
  "methodology": ["Ethnographic Studies", "User Interviews", "Contextual Inquiry"],
  ...existing fields
}
```

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`

Add methodology tag styles:
```css
.methodology-tag {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
}
```

Remove modal color theming CSS (Lines 987-1009).

**Test**: Modals open without color themes, methodology displays when present.

---

### Phase 6: Reduce Animations

**File**: `/Users/shonareed/Code/shona-reed-portfolio/src/js/main-modern.js`

1. **Remove Parallax (Lines 408-415)**: Delete hero parallax scroll effect
2. **Simplify Section Animations (Lines 436-518)**:
   - Reduce translateY distance from 30px to 15px
   - Reduce durations from 0.8s to 0.6s
   - Remove fadeInRight, use fadeInUp for all

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`

Remove scale/transform hover effects:
- Theme toggle: Remove scale (Lines 226-230)
- Buttons: Remove translateY and scale (Lines 414-418)
- Profile image: Remove scale (Lines 451-454)
- Social links: Remove translateY (Lines 475-479)
- Tags: Remove translateY and scale (Lines 697-699)

**Test**: Page feels calm and purposeful, respects prefers-reduced-motion.

---

### Phase 7: Add Contact Form

**File**: `/Users/shonareed/Code/shona-reed-portfolio/index.html` (Lines 160-174)

Replace placeholder with functional form:
```html
<section id="contact" class="contact">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Get In Touch</h2>
            <p class="section-subtitle">
                Interested in collaborating? Let's discuss your research or design needs.
            </p>
        </div>

        <div class="contact-content">
            <form class="contact-form" id="contact-form">
                <div class="form-group">
                    <label for="contact-email">Email</label>
                    <input type="email" id="contact-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="contact-message">Message</label>
                    <textarea id="contact-message" name="message" rows="6" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    </div>
</section>
```

**File**: `/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`

Add form styles:
```css
.form-input, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 0;
  color: var(--color-text-primary);
}

.form-input:focus, .form-textarea:focus {
  border-color: var(--color-text-primary);
  background: var(--color-bg-primary);
}
```

**File**: `/Users/shonareed/Code/shona-reed-portfolio/src/js/main-modern.js` (Line 345 area)

Add form handler to `setupEventListeners()`:
```javascript
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        const subject = 'Portfolio Contact from ' + email;
        const body = encodeURIComponent(message + '\n\nFrom: ' + email);
        window.location.href = `mailto:ux@shonareed.com?subject=${subject}&body=${body}`;
        contactForm.reset();
    });
}
```

**Test**: Form validates, triggers mailto, resets after submission.

---

## Critical Files to Modify

1. **`/Users/shonareed/Code/shona-reed-portfolio/dist/styles-modern.css`** (1103 lines)
   - Color variables (Lines 16-87)
   - Remove gradients throughout (Lines 341-344, 375-379, 408-418, 574-597, 987-1009)
   - Typography system (Lines 2, 39-41, 113-137)
   - Add skills section styles (~80 new lines)
   - Add contact form styles (~60 new lines)
   - Simplify hover effects

2. **`/Users/shonareed/Code/shona-reed-portfolio/index.html`** (215 lines)
   - Navigation links (Lines 16-22)
   - Hero content (Lines 49-81)
   - About content (Lines 84-109)
   - Add Skills section (after line 109, ~50 new lines)
   - Work section title (Lines 114-119)
   - Contact form (Lines 160-174, ~30 new lines)

3. **`/Users/shonareed/Code/shona-reed-portfolio/src/js/main-modern.js`** (586 lines)
   - Update sections array (Line 383)
   - Remove modal color theming (Lines 103-107)
   - Add methodology rendering (Lines 140 area)
   - Remove parallax (Lines 408-415)
   - Simplify animations (Lines 436-518)
   - Add contact form handler (Line 345 area)

4. **`/Users/shonareed/Code/shona-reed-portfolio/data/projects.json`** (79 lines)
   - Add `methodology` array to each project
   - Update descriptions to emphasize research

5. **`/Users/shonareed/Code/shona-reed-portfolio/CLAUDE.md`**
   - Document new minimal design philosophy
   - Update color palette documentation
   - Add Skills section maintenance notes

---

## Existing Patterns to Reuse

- **Event delegation pattern** for project cards (Line 57 in main-modern.js) - keep as-is
- **Intersection Observer** for scroll animations (Lines 69-82) - simplify but keep pattern
- **Modal rendering via template literals** (Lines 95-183) - keep pattern, update content
- **Theme toggle with localStorage** (Lines 520-559) - keep unchanged
- **CSS custom properties for theming** - keep pattern, change values
- **Responsive grid system** - keep, apply to new Skills section

---

## Verification Steps

### Visual Testing
1. Open DevTools browser to `http://localhost:8080`
2. Verify color transformation:
   - [ ] No gradients visible (hero, buttons, cards, modal)
   - [ ] Grayscale palette throughout
   - [ ] Project images provide only color
3. Verify typography:
   - [ ] IBM Plex Sans used throughout (no Playfair Display)
   - [ ] Clear heading hierarchy by weight/size alone
4. Verify new sections:
   - [ ] Skills section displays with 4-column grid (desktop)
   - [ ] Contact form displays and is usable
5. Test responsive:
   - [ ] Resize to tablet (768px): Skills grid adapts, form works
   - [ ] Resize to mobile (375px): Single column, hamburger menu works

### Functional Testing
1. Navigation:
   - [ ] Click each nav link (About, Skills, Research, Contact)
   - [ ] Verify active highlighting on scroll
   - [ ] Test mobile menu (open, close, click link)
2. Projects:
   - [ ] Click project card, verify modal opens
   - [ ] Verify methodology displays (if present in JSON)
   - [ ] Verify no color theming applied
   - [ ] Test gallery navigation (arrows, thumbnails)
   - [ ] Press Escape to close modal
3. Contact form:
   - [ ] Submit without email - verify validation
   - [ ] Submit with valid data - verify mailto triggers
   - [ ] Verify form resets after submission

### Accessibility Testing
1. Keyboard navigation:
   - [ ] Tab through all interactive elements
   - [ ] Verify focus indicators visible
   - [ ] Open/close modal with keyboard
   - [ ] Navigate gallery with arrow keys
2. Contrast:
   - [ ] Run Lighthouse accessibility audit (target > 90)
   - [ ] Verify text contrast in both dark/light modes
3. Screen reader (optional):
   - [ ] Test with VoiceOver (Mac) or NVDA (Windows)
   - [ ] Verify all sections and form labels are announced

### Performance Testing
1. Run Lighthouse in DevTools:
   - [ ] Performance > 90
   - [ ] Accessibility > 90
   - [ ] Best Practices > 90
   - [ ] SEO > 90
2. Check Network tab:
   - [ ] No Playfair Display font loading
   - [ ] Images load with lazy loading
   - [ ] No console errors

### Cross-Browser Testing (if time permits)
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Implementation Sequence

**Recommended order** (each phase builds on previous):

1. **Phase 1**: Color transformation (2-3 hours) - Foundation for all visual changes
2. **Phase 2**: Typography (1 hour) - Establishes content hierarchy
3. **Phase 3**: Skills section (2 hours) - Adds core research content
4. **Phase 4**: Content updates (1 hour) - Research positioning
5. **Phase 5**: Project simplification (2 hours) - Removes visual complexity
6. **Phase 6**: Animation reduction (1 hour) - Minimal aesthetic polish
7. **Phase 7**: Contact form (1.5 hours) - Functional completeness
8. **Testing**: Comprehensive QA (2-3 hours) - Quality assurance

**Total estimated time**: 12-14 hours

**Critical path**: Phases 1-2 must be done first. Phases 3-7 can partially overlap if multiple developers.

---

## Rollback Strategy

Each phase should be committed separately:
```bash
git commit -m "feat: transform color palette to minimal grayscale"
git commit -m "feat: replace Playfair with IBM Plex Sans"
git commit -m "feat: add skills taxonomy section"
# ... etc
```

This allows reverting individual changes if needed without losing all progress.

---

## Post-Implementation

Update documentation:
- Add design philosophy notes to `CLAUDE.md`
- Document Skills section maintenance
- Update projects.json schema documentation
- Note methodology field usage in modal rendering

Consider future enhancements:
- Move skills from HTML to `data/skills.json` for easier maintenance
- Add project categorization filters (Research vs Design tabs)
- Replace mailto with proper contact form backend (Formspree/Netlify Forms)
- Add case study pages for deep research methodology documentation
