# Yoonus Khan - Personal Web Developer Portfolio

A modern, professional, and fully responsive personal portfolio website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (zero external frameworks or heavy libraries).

Designed for **Yoonus Khan**, an aspiring Web Developer, to showcase frontend projects, core technical skills, services offered, and contact details with a dark tech aesthetic (featuring deep blacks, navy blues, and electric blue accents).

---

## 🚀 Live Demo & Preview

Open `index.html` in any modern web browser or run it with Visual Studio Code's **Live Server** extension.

---

## ✨ Features & Highlights

- **Dark & Modern Theme**: Sleek dark UI with deep navy tones (`#070a13`, `#0b1120`, `#0f172a`), vibrant electric blue accents (`#00d2ff`, `#38bdf8`), subtle glowing cards, and an accessible Light Mode toggle.
- **Dynamic Typing Animation**: Smooth typewriter effect in the hero section displaying *"Frontend Developer"*, *"Web Designer"*, and *"Creative Problem Solver"*.
- **Responsive Navigation**:
  - Sticky glassmorphic navbar with active section scroll spy.
  - Animated hamburger menu for mobile devices with accessible ARIA controls and backdrop overlay.
  - Highlighted "Download CV" action button.
- **Curriculum Vitae (CV) Modal**:
  - Quick modal preview of Yoonus Khan's resume summary.
  - 1-click **Print / Save as PDF** and **Download Text CV** actions.
- **Interactive Project Showcase**:
  - **Personal Portfolio**: Responsive dark theme portfolio with custom CSS animations.
  - **CyberLearn**: Cybersecurity learning platform featuring interactive course modules and terminal labs.
  - **Dice Roll Game**: Interactive playable dice roll game right inside the browser with animated 3D-styled dice!
  - **To-Do List**: Fully working task manager where visitors can add, check off, and delete tasks in real time.
- **Core Skills Display**:
  - HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, Git, GitHub, and VS Code.
  - Honest, competency-focused breakdown without fabricated percentages.
- **Services Offered**:
  - Responsive Website Development, Landing Page Design, Personal Portfolio Websites, and Basic Website Maintenance.
  - Direct 1-click inquiry linking straight into the contact form.
- **Contact Form Validation**:
  - Pure Vanilla JavaScript client-side validation for Name, Email format, Subject, and Message length.
  - Accessible error messages, visual indicators, and success confirmation banner.
  - Fallback "Open Default Email Client Directly" (`mailto:`) option.
- **Back to Top & Automatic Copyright**:
  - Smooth floating back-to-top button appearing upon scroll.
  - Copyright year dynamically generated via `new Date().getFullYear()`.

---

## 📁 File Structure

```text
Web-Developer-Portfolio/
├── index.html         # Semantic HTML5 structure & content
├── style.css          # Vanilla CSS3 styling, design tokens & responsive media queries
├── script.js          # Vanilla JavaScript logic (animations, validation, theme, demos)
├── assets/
│   └── profile.jpg    # Developer portrait image (with SVG fallback)
└── README.md          # Project documentation
```

---

## 🛠️ How to Run in Visual Studio Code

1. **Open the Project Folder in VS Code**:
   - Launch VS Code.
   - Go to **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
   - Select the `Web-Developer-Portfolio` folder.

2. **Run with Live Server (Recommended)**:
   - Install the **Live Server** extension by Ritwick Dey from the VS Code Extensions tab (`Ctrl + Shift + X`).
   - Right-click `index.html` in the file explorer.
   - Click **"Open with Live Server"** (or click the **"Go Live"** button in the status bar at the bottom right).
   - Your default browser will automatically open `http://127.0.0.1:5500/index.html` with hot-reloading enabled.

3. **Alternative (Direct Browser Open)**:
   - Double-click `index.html` in your file manager (Windows File Explorer).
   - It will open immediately in any browser (Chrome, Edge, Firefox, Brave, Safari).

---

## 🎨 Customization Guide

- **Change Personal Details**: Open `index.html` and edit your name, bio, social links, and email address.
- **Change Avatar**: Replace `assets/profile.jpg` with your own profile picture (a square 1:1 ratio is recommended).
- **Connect Real Email Backend**:
  - To receive emails directly from the contact form without a backend, sign up for [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com).
  - Simply set `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` on `<form id="contact-form">` in `index.html`.

---

## 📄 License

This portfolio template is open source and available for personal customization and use.