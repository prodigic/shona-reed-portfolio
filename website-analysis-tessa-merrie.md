# Website Structure Analysis: Tessa Merrie Portfolio
**URL:** https://www.tessamerrie.info/
**Analysis Date:** February 8, 2026
**Site Type:** Portfolio - UX Research & Design

---

## Executive Summary

Tessa Merrie's portfolio demonstrates a minimal, content-first approach built on Squarespace. The site positions her as a researcher-designer, emphasizing ethnographic methodology over visual flourish. The architecture balances information density with clean presentation, targeting academic and professional design audiences.

---

## 1. Overall Layout & Design Philosophy

### Design Approach
- **Aesthetic**: Clean, minimal design centered on content presentation
- **Platform**: Squarespace (Template ID: 52a74dafe4b073a80cd253c5)
- **Architecture**: Portfolio-focused with project showcase priority
- **Content Strategy**: Progressive disclosure of professional credentials and work

### Key Characteristics
- Grayscale/neutral color palette
- Project imagery as primary visual interest
- Sans-serif typography throughout
- Structured hierarchy for work organization
- Academic/professional tone over commercial appeal

---

## 2. Navigation Structure

### Primary Menu Organization
```
├── About (Homepage)
├── Research (6 projects)
├── Design (3 projects)
├── Résumé
└── Contact (Footer anchor)
```

### Navigation Patterns
- **Desktop**: Fixed header navigation
- **Mobile**: Toggle menu with label visibility
- **Hierarchy**: Two-level structure (Categories → Projects)
- **Sections**: Research and Design as primary work categories

---

## 3. Content Organization & Information Architecture

### Homepage Sections
1. **Hero Statement**
   - Professional positioning: "User experience - ethnography and design"
   - Establishes dual expertise immediately

2. **Recent Work Showcase**
   - Project cards with linked thumbnails
   - Image-text paired layout
   - Consistent formatting across projects

3. **Design Ethnography Section**
   - Emphasis on research methodology
   - Positions designer as researcher first
   - Unique positioning for portfolio sites

4. **Interface Design Section**
   - Design work showcase
   - Complementary to research focus

5. **Skills Taxonomy**
   - Organized by category:
     - Planning
     - Management
     - Field Research
     - Additional methodologies
   - Structured lists rather than visual bars
   - Information-dense presentation

---

## 4. Typography System

### Font Implementation
- **Platform**: Squarespace default typography system
- **Style**: Consistent sans-serif treatment
- **Hierarchy**: Clear visual hierarchy for headings, body text, and metadata
- **Readability**: Professional tone through typographic consistency

### Text Elements
- Hero/tagline emphasis
- Section headers
- Project titles
- Body copy
- Skills/tags

---

## 5. Color Scheme & Visual Design

### Color Palette
- **Primary Background**: `rgba(255,255,255,1)` (White)
- **Primary Text**: `rgba(34,34,34,1)` (Near-black)
- **Approach**: Minimal grayscale palette
- **Accent**: Project imagery provides color interest
- **Contrast**: Strong text/background contrast for readability

### Visual Strategy
- Let content speak through imagery
- Neutral frame doesn't compete with work
- Professional, timeless aesthetic
- Focus on typography and white space

---

## 6. Interactive Elements & Animations

### User Interactions
- **Image Zoom**: Enabled on project images
- **Gallery Collections**: Configurable transitions (fade effect)
- **Social Sharing**: Active (Facebook, Pinterest)
- **Liking System**: Disabled
- **Comment System**: Disabled
- **Contact Form**: Email validation with minimal friction

### Animation Patterns
- Subtle fade transitions in galleries
- Standard hover states
- Minimal animation approach (content-first)

---

## 7. Responsive Design Implementation

### Mobile Configuration
- **Navigation**: Toggle with label visibility
- **Gallery Aspect Ratio**: 3:2 Standard
- **Grid Spacing**: 10px
- **Image Cropping**: Auto-crop enabled for consistency
- **Touch Optimization**: Touch-optimized navigation elements

### Breakpoints Strategy
- Desktop-first approach (Squarespace default)
- Simplified mobile layouts
- Maintained content hierarchy across devices

---

## 8. Technical Implementation

### Platform & Backend
- **CMS**: Squarespace
- **Template**: Portfolio template (ID: 52a74dafe4b073a80cd253c5)
- **Domain**: Custom domain integration (www.tessamerrie.info)
- **Timezone**: PST (America/Los_Angeles)

### JavaScript Architecture
```javascript
Static.SQUARESPACE_CONTEXT {
  - 18 beta feature flags
  - Rollup-based asset loading
  - Form validation framework
  - Internationalization data
  - Image metadata processing (disabled)
}
```

### Key Scripts & Features
1. **Rollup Asset System**: Modern bundling approach
2. **Form Validation**: Extensive field format support
3. **Recaptcha Enterprise**: Spam prevention
4. **Image Processing**: Metadata processing disabled for performance
5. **Beta Features**: 18 feature flags for progressive enhancement

### Form Validation Support
- Email format validation
- Field requirement checking
- Real-time validation messaging
- Enterprise-grade security (Recaptcha)

---

## 9. Accessibility Features

### WCAG Compliance Efforts
- **Semantic HTML**: Structured document outline
- **Form Validation**: Clear messaging for errors
- **Alt Text**: Image description support
- **Touch Targets**: Optimized for mobile interaction
- **Security**: Recaptcha Enterprise implementation
- **Keyboard Navigation**: Platform default support

### Accessibility Approach
- Platform-provided accessibility features
- Form field validation with clear feedback
- Semantic structure for screen readers
- Touch-optimized for motor accessibility

---

## 10. Notable Design Patterns & Unique Features

### Distinctive Elements

#### 1. Research-First Positioning
- **Unique Approach**: Emphasizes ethnographic methodology
- **Differentiation**: Positions as researcher first, designer second
- **Audience**: Academic/professional design community
- **Impact**: Uncommon for traditional portfolio sites

#### 2. Skill Taxonomy Presentation
- **Format**: Structured lists vs. visual skill bars
- **Categories**: Planning, Management, Field Research, etc.
- **Benefit**: Information-dense, scannable format
- **Professional**: Matches resume/CV expectations

#### 3. Content Organization
- **Research Section**: 6 detailed projects
- **Design Section**: 3 complementary projects
- **Balance**: 2:1 ratio emphasizing research expertise

#### 4. Contact Integration
- **Footer Form**: Minimal friction (email + message)
- **Location**: "San Francisco, USA"
- **Approach**: Professional without being corporate

#### 5. Project Cards
- **Consistency**: Uniform image-text layout
- **Imagery**: High-quality project photography
- **Linking**: Direct navigation to case studies

### Design Philosophy Insights

**Information Architecture**
- Clear categorization (Research vs. Design)
- Progressive disclosure of detail
- Hierarchy supports scanning and deep reading

**Visual Communication**
- Minimal interference with content
- Project work speaks for itself
- Professional credibility through restraint

**User Experience**
- Fast, simple navigation
- Clear calls-to-action
- Reduced cognitive load
- Focus on portfolio content

---

## 11. Comparison Insights for Portfolio Design

### Strengths to Consider
1. **Clear Positioning**: Research-first approach is immediately clear
2. **Content Hierarchy**: Well-organized project categorization
3. **Minimal Distraction**: Design doesn't compete with work
4. **Professional Tone**: Academic credibility through restraint
5. **Information Density**: Skill taxonomy efficiently communicates expertise

### Potential Improvements
1. **Visual Interest**: Could benefit from more dynamic hero/landing
2. **Interactivity**: Limited animations/transitions
3. **Personality**: Professional but somewhat impersonal
4. **Case Study Depth**: Navigation suggests depth, but initial view is minimal

### Applicable Patterns for Shona Reed Portfolio
- Skill taxonomy organization approach
- Research methodology emphasis
- Clear project categorization
- Minimal design aesthetic
- Professional positioning strategy

---

## 12. Technical Specifications Summary

| Aspect | Implementation |
|--------|---------------|
| **Platform** | Squarespace |
| **Template ID** | 52a74dafe4b073a80cd253c5 |
| **Domain** | www.tessamerrie.info |
| **Location** | San Francisco, USA |
| **Timezone** | PST (America/Los_Angeles) |
| **Asset Loading** | Rollup-based bundling |
| **Security** | Recaptcha Enterprise |
| **Gallery Aspect** | 3:2 Standard |
| **Grid Spacing** | 10px |
| **Beta Features** | 18 active flags |

---

## Conclusion

Tessa Merrie's portfolio demonstrates that effective portfolio sites need not be visually complex. The site succeeds through:

1. **Clear positioning** as a research-focused UX professional
2. **Organized content** with intuitive categorization
3. **Minimal aesthetic** that foregrounds work over design
4. **Professional credibility** through structured presentation
5. **Technical solidity** via Squarespace platform

The site serves as an excellent example of **content-first portfolio design**, particularly effective for research-oriented practitioners in UX/design fields. While it lacks the visual dynamism of some contemporary portfolios, this restraint reinforces the professional, academic positioning of the practitioner.

For designers emphasizing research methodology, this structure provides a proven template for communicating expertise without visual excess.

---

**Analysis Complete**
