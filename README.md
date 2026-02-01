# Shona Reed - Modern Portfolio Site

A modern, responsive portfolio website showcasing UX research and design work. Built with vanilla HTML, CSS, and JavaScript featuring a sophisticated dark theme and full-screen project modals.

## ✨ Features

- **2026 Modern Design**: Refined brutalism meets contemporary minimalism aesthetic
- **Dark-First Theme**: Sophisticated color palette with strategic accent colors
- **Full-Screen Modals**: Enhanced project viewing with image galleries
- **Responsive Layout**: Clean grid system that adapts to all screen sizes
- **Professional Typography**: Playfair Display, IBM Plex Sans, and JetBrains Mono
- **Smooth Animations**: CSS transitions and intersection observer effects
- **Keyboard Navigation**: Arrow keys and Escape key support in modals

## 🎨 Design System

### Colors
- **Primary Background**: `#0a0a0a` (Deep black)
- **Secondary Background**: `#1a1a1a` (Dark gray)
- **Accent Color**: `#ff6b35` (Strategic orange)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#a0a0a0` (Light gray)

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: IBM Plex Sans (content)
- **Monospace Font**: JetBrains Mono (labels, code)

## 🚀 Getting Started

### Prerequisites
- A local web server (Python, Node.js, or any HTTP server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prodigic/shona-reed-portfolio.git
   cd shona-reed-portfolio
   ```

2. **Start a local server**

   **Using Python:**
   ```bash
   python -m http.server 8080
   ```

   **Using Node.js (if you have http-server installed):**
   ```bash
   npm install -g http-server
   http-server -p 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
shona-reed-portfolio/
├── index.html              # Original Jekyll-migrated version
├── index-modern.html       # 2026 modern redesigned version ⭐
├── package.json           # Project configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── data/
│   └── projects.json      # Portfolio project data
├── src/
│   ├── js/
│   │   ├── main.js        # Original functionality
│   │   └── main-modern.js # Enhanced modern functionality ⭐
│   └── styles/
│       └── globals.css    # Base Tailwind styles
├── dist/
│   ├── styles.css         # Original compiled CSS
│   └── styles-modern.css  # Modern design CSS ⭐
└── assets/
    └── images/           # Project images and client logos
```

## 🎯 Key Files

- **`index-modern.html`** - The main modern portfolio page
- **`dist/styles-modern.css`** - Complete modern design system
- **`src/js/main-modern.js`** - Enhanced JavaScript functionality
- **`data/projects.json`** - Portfolio project data structure

## 📊 Project Data Structure

Each project in `data/projects.json` follows this structure:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "client": "Client Name",
  "role": "Your Role",
  "tags": ["tag1", "tag2", "tag3"],
  "description": "Detailed project description...",
  "thumbnail": "project-thumbnail.png",
  "clientLogo": "client-logo.png", // Optional
  "images": ["image1.png", "image2.png"], // Gallery images
  "projectDate": "2024",
  "modalId": 1
}
```

## 🖼️ Adding Client Logos

Client logos are displayed in project modals with professional styling:

1. **Add logo file** to `assets/images/` (PNG or SVG)
2. **Update project data** with `clientLogo` field
3. **Logo styling** automatically applies (200px width, white background)

## 🔧 Customization

### Colors
Edit CSS variables in `dist/styles-modern.css`:
```css
:root {
  --color-accent: #ff6b35;      /* Change accent color */
  --color-bg-primary: #0a0a0a;  /* Change background */
}
```

### Typography
Update font imports and variables:
```css
--font-display: 'Your Display Font', serif;
--font-body: 'Your Body Font', sans-serif;
```

## 🌟 Modern Features

### Full-Screen Modals
- Click any project to open full-screen modal
- Navigate images with arrow keys or thumbnails
- Close with Escape key or X button
- Smooth transitions and animations

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Flexible grid system
- Touch-friendly navigation

### Performance
- Lazy loading images
- CSS variables for consistency
- Optimized animations
- Minimal JavaScript footprint

## 🎨 Design Philosophy

**Refined Brutalism meets Contemporary Minimalism**
- Bold typography with elegant spacing
- Strategic use of color and contrast
- Sophisticated dark theme
- Professional client presentation
- Modern interaction patterns

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a portfolio project. For suggestions or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is for portfolio demonstration purposes.

---

**Built with ❤️ using modern web technologies**
*Designed and developed in 2026*