/**
 * ==============================================================================
 * YOONUS KHAN - PERSONAL PORTFOLIO JAVASCRIPT
 * Technologies: Pure Vanilla JavaScript (ES6+), Zero External Libraries
 * Features:
 *   1. Theme Toggle (Dark & Light) with LocalStorage persistence
 *   2. Mobile Hamburger Navigation & Accessible Overlay
 *   3. Smooth Scrolling with Fixed Header Offset
 *   4. Dynamic Typing Animation (Frontend Developer, Web Designer, etc.)
 *   5. Scroll Reveal Animations (IntersectionObserver)
 *   6. Active Navigation Link Highlighting (Scroll Spy)
 *   7. Client-Side Contact Form Validation & Feedback
 *   8. Interactive Project Demos (Dice Roll Game, To-Do List, CyberLearn)
 *   9. Curriculum Vitae (CV) Preview, Print & Download
 *  10. Back to Top Smooth Scroll & Dynamic Visibility
 *  11. Automatic Copyright Year
 *  12. Toast Notification Feedback System
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. GLOBAL UTILITY: TOAST NOTIFICATIONS
  // ----------------------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');

  /**
   * Display a clean toast message at the bottom of the screen.
   * @param {string} message - The text to display
   * @param {string} icon - Optional emoji/icon
   */
  function showToast(message, icon = '✨') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    // Remove from DOM after animation completes (3 seconds total)
    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

  // ----------------------------------------------------------------------------
  // 2. THEME TOGGLE (DARK / LIGHT MODE)
  // ----------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const STORAGE_KEY = 'yk_portfolio_theme';

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      showToast(`Switched to ${newTheme} theme`, newTheme === 'dark' ? '🌙' : '☀️');
    });
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isLight = theme === 'light';
      themeToggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeToggleBtn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }

  // ----------------------------------------------------------------------------
  // 3. MOBILE HAMBURGER MENU & ACCESSIBILITY
  // ----------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const primaryNav = document.getElementById('primary-nav');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    if (!hamburgerBtn || !primaryNav) return;
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    primaryNav.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !primaryNav) return;
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    body.style.overflow = '';
  }

  function toggleMobileMenu() {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile navigation on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile navigation on pressing ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav && primaryNav.classList.contains('open')) {
      closeMobileMenu();
      if (hamburgerBtn) hamburgerBtn.focus();
    }
  });

  // ----------------------------------------------------------------------------
  // 4. HEADER BACKGROUND SHADOW ON SCROLL
  // ----------------------------------------------------------------------------
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ----------------------------------------------------------------------------
  // 5. DYNAMIC TYPING ANIMATION
  // ----------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    'Frontend Developer',
    'Web Designer',
    'Creative Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 110;
  let deletingDelay = 55;
  let pauseEndDelay = 1800;
  let pauseStartDelay = 450;

  function typeAnimation() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing characters
      charIndex++;
      typingElement.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === currentPhrase.length) {
        // Finished typing word, pause before deleting
        isDeleting = true;
        setTimeout(typeAnimation, pauseEndDelay);
        return;
      }
      setTimeout(typeAnimation, typingDelay);
    } else {
      // Deleting characters
      charIndex--;
      typingElement.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting, move to next word
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeAnimation, pauseStartDelay);
        return;
      }
      setTimeout(typeAnimation, deletingDelay);
    }
  }

  // Start typing animation
  if (typingElement) {
    setTimeout(typeAnimation, 600);
  }

  // ----------------------------------------------------------------------------
  // 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ----------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ----------------------------------------------------------------------------
  // 7. ACTIVE NAVIGATION LINK HIGHLIGHTING (SCROLL SPY)
  // ----------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ----------------------------------------------------------------------------
  // 8. BACK TO TOP FUNCTIONALITY
  // ----------------------------------------------------------------------------
  const floatingBackToTop = document.getElementById('back-to-top');
  const footerBackToTop = document.getElementById('footer-back-to-top');

  function handleBackToTopVisibility() {
    if (!floatingBackToTop) return;
    if (window.scrollY > 350) {
      floatingBackToTop.classList.add('visible');
    } else {
      floatingBackToTop.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  if (floatingBackToTop) floatingBackToTop.addEventListener('click', scrollToTop);
  if (footerBackToTop) footerBackToTop.addEventListener('click', scrollToTop);

  // ----------------------------------------------------------------------------
  // 9. AUTOMATIC COPYRIGHT YEAR
  // ----------------------------------------------------------------------------
  const copyrightYear = document.getElementById('current-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // ----------------------------------------------------------------------------
  // 10. SERVICES QUICK-INQUIRY ACTION
  // ----------------------------------------------------------------------------
  // When user clicks "Inquire about this service", pre-fill subject and smoothly navigate
  const serviceActionLinks = document.querySelectorAll('.service-action-link');
  const subjectInput = document.getElementById('contact-subject');
  const hiddenSubjectInput = document.getElementById('formsubmit-subject');
  const contactFormCard = document.getElementById('contact-form-card');
  const contactSection = document.getElementById('contact');

  serviceActionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = link.getAttribute('data-service') || 'Web Development';
      
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${serviceName}`;
        if (hiddenSubjectInput) {
          hiddenSubjectInput.value = `Inquiry: ${serviceName}`;
        }
        if (typeof clearError === 'function') {
          const group = subjectInput.closest('.form-group');
          const errorSpan = document.getElementById('subject-error');
          clearError(group, errorSpan);
        }
      }

      // Smoothly scroll to contact section with sticky header offset
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      // Flash highlight animation on the form card
      if (contactFormCard) {
        contactFormCard.classList.remove('highlighted');
        void contactFormCard.offsetWidth; // Trigger DOM reflow
        contactFormCard.classList.add('highlighted');
      }

      showToast(`Inquiry prepared for "${serviceName}" ✨`, '📝');

      // Focus name or message input
      setTimeout(() => {
        const nameField = document.getElementById('contact-name');
        const messageField = document.getElementById('contact-message');
        if (nameField && !nameField.value.trim()) {
          nameField.focus();
        } else if (messageField) {
          messageField.focus();
        }
      }, 400);
    });
  });

  // ----------------------------------------------------------------------------
  // 11. CONTACT FORM VALIDATION & HANDLING
  // ----------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('form-submit-btn');
  const mailtoDirectBtn = document.getElementById('mailto-direct-btn');

  // Input Error Elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Email regex validation standard
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateName() {
    if (!nameInput) return true;
    const value = nameInput.value.trim();
    const group = nameInput.closest('.form-group');

    if (!value) {
      setNameError('Please enter your name.');
      return false;
    } else if (value.length < 2) {
      setNameError('Name must be at least 2 characters long.');
      return false;
    } else {
      clearError(group, nameError);
      return true;
    }
  }

  function setNameError(msg) {
    if (!nameInput) return;
    const group = nameInput.closest('.form-group');
    group.classList.add('has-error');
    if (nameError) nameError.textContent = msg;
    nameInput.setAttribute('aria-invalid', 'true');
  }

  function validateEmail() {
    if (!emailInput) return true;
    const value = emailInput.value.trim();
    const group = emailInput.closest('.form-group');

    if (!value) {
      setEmailError('Please enter your email address.');
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address (e.g., name@example.com).');
      return false;
    } else {
      clearError(group, emailError);
      return true;
    }
  }

  function setEmailError(msg) {
    if (!emailInput) return;
    const group = emailInput.closest('.form-group');
    group.classList.add('has-error');
    if (emailError) emailError.textContent = msg;
    emailInput.setAttribute('aria-invalid', 'true');
  }

  function validateSubject() {
    if (!subjectInput) return true;
    const value = subjectInput.value.trim();
    const group = subjectInput.closest('.form-group');

    if (!value) {
      setSubjectError('Please enter a subject.');
      return false;
    } else if (value.length < 3) {
      setSubjectError('Subject must be at least 3 characters.');
      return false;
    } else {
      clearError(group, subjectError);
      return true;
    }
  }

  function setSubjectError(msg) {
    if (!subjectInput) return;
    const group = subjectInput.closest('.form-group');
    group.classList.add('has-error');
    if (subjectError) subjectError.textContent = msg;
    subjectInput.setAttribute('aria-invalid', 'true');
  }

  function validateMessage() {
    if (!messageInput) return true;
    const value = messageInput.value.trim();
    const group = messageInput.closest('.form-group');

    if (!value) {
      setMessageError('Please enter your message.');
      return false;
    } else if (value.length < 10) {
      setMessageError('Message should be at least 10 characters so I understand your inquiry.');
      return false;
    } else {
      clearError(group, messageError);
      return true;
    }
  }

  function setMessageError(msg) {
    if (!messageInput) return;
    const group = messageInput.closest('.form-group');
    group.classList.add('has-error');
    if (messageError) messageError.textContent = msg;
    messageInput.setAttribute('aria-invalid', 'true');
  }

  function clearError(group, errorSpan) {
    if (group) group.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = '';
  }

  // Attach live validation on blur and input events
  if (nameInput) {
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
      if (nameInput.closest('.form-group').classList.contains('has-error')) validateName();
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.closest('.form-group').classList.contains('has-error')) validateEmail();
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.closest('.form-group').classList.contains('has-error')) validateSubject();
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      if (messageInput.closest('.form-group').classList.contains('has-error')) validateMessage();
    });
  }

  // Handle Form Submission with Real Email Delivery
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showFormAlert('Please fix the highlighted fields above before sending.', 'error');
        // Focus the first invalid field
        if (!isNameValid && nameInput) nameInput.focus();
        else if (!isEmailValid && emailInput) emailInput.focus();
        else if (!isSubjectValid && subjectInput) subjectInput.focus();
        else if (!isMessageValid && messageInput) messageInput.focus();
        return;
      }

      const senderName = nameInput ? nameInput.value.trim() : '';
      const senderEmail = emailInput ? emailInput.value.trim() : '';
      const subjectText = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const messageBody = messageInput ? messageInput.value.trim() : '';

      // Update button to sending state
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending inquiry...</span>`;
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/yoonuwebdev@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            _subject: subjectText,
            message: messageBody,
            _captcha: 'false',
            _template: 'table'
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok || data.success === 'true' || data.success === true) {
          showFormAlert(`✓ Thank you, <strong>${senderName}</strong>! Your inquiry has been sent successfully to <strong>yoonuwebdev@gmail.com</strong>. Yoonus will reply shortly.`, 'success');
          showToast('Inquiry sent successfully! 🚀', '✅');
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Server response was not ok');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX fallback to mailto:', err);
        // Automatic fallback: Open email client with prefilled details
        const fallbackMailto = `mailto:yoonuwebdev@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(messageBody + '\n\n-- From: ' + senderName + (senderEmail ? ' (' + senderEmail + ')' : ''))}`;

        showFormAlert(`Network form delivery encountered an issue. Launching your email app directly to send to <strong>yoonuwebdev@gmail.com</strong>...`, 'error');
        showToast('Opening email client as backup...', '📧');

        setTimeout(() => {
          window.location.href = fallbackMailto;
        }, 1200);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  function showFormAlert(message, type) {
    if (!formAlert) return;
    formAlert.className = `form-alert ${type}`;
    formAlert.innerHTML = message;
    formAlert.style.display = 'block';

    // Auto dismiss after 8 seconds
    setTimeout(() => {
      if (formAlert) formAlert.style.display = 'none';
    }, 8000);
  }

  // Fallback direct mailto action
  if (mailtoDirectBtn) {
    mailtoDirectBtn.addEventListener('click', () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subj = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const msg = messageInput && messageInput.value.trim() ? messageInput.value.trim() : '';
      const bodyText = msg 
        ? `${msg}\n\n-- From: ${name || 'A Website Visitor'}${email ? ' (' + email + ')' : ''}`
        : `Hi Yoonus,\n\nI visited your portfolio and wanted to reach out regarding...`;

      const mailtoUrl = `mailto:yoonuwebdev@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailtoUrl;
      showToast('Opening default email client...', '📧');
    });
  }

  // ----------------------------------------------------------------------------
  // 12. CV MODAL, PRINT & DOWNLOAD
  // ----------------------------------------------------------------------------
  const cvModal = document.getElementById('cv-modal');
  const openCvButtons = document.querySelectorAll('.open-cv-btn');
  const cvModalClose = document.getElementById('cv-modal-close');
  const cvPrintBtn = document.getElementById('cv-print-btn');
  const cvDownloadConfirmBtn = document.getElementById('cv-download-confirm-btn');

  function openCVModal() {
    if (!cvModal) return;
    cvModal.style.display = 'flex';
    body.style.overflow = 'hidden';
  }

  function closeCVModal() {
    if (!cvModal) return;
    cvModal.style.display = 'none';
    body.style.overflow = '';
  }

  openCvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCVModal();
    });
  });

  if (cvModalClose) {
    cvModalClose.addEventListener('click', closeCVModal);
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCVModal();
    });
  }

  // Print CV / Save as PDF
  if (cvPrintBtn) {
    cvPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Download CV as clean text file
  if (cvDownloadConfirmBtn) {
    cvDownloadConfirmBtn.addEventListener('click', () => {
      const cvText = `=================================================================
YOONUS KHAN - CURRICULUM VITAE
Aspiring Web Developer
Email: yoonuwebdev@gmail.com
GitHub: https://github.com/Yoonu-A
LinkedIn: https://linkedin.com/in/yoonus-khan
=================================================================

PROFESSIONAL SUMMARY:
Aspiring Web Developer passionate about creating responsive, user-friendly
websites using HTML5, CSS3, and Vanilla JavaScript. Committed to continuous
learning, writing semantic markup, and turning creative ideas into functional
web experiences.

CORE TECHNICAL SKILLS:
- Frontend: HTML5 (Semantic Markup, SEO, Accessibility/ARIA), CSS3 (Flexbox, Grid, Animations), Vanilla JavaScript (ES6+, DOM Manipulation)
- Methodologies: Responsive Web Design, Mobile-First Approach, Cross-Browser Compatibility
- Tools: Git, GitHub, Visual Studio Code, Chrome DevTools

FEATURED PROJECTS:
1. Personal Portfolio
   - Responsive personal portfolio built with HTML, CSS, and JavaScript.
   - Clean dark aesthetic, electric blue accents, and accessible design.

2. CyberLearn
   - Cybersecurity learning platform showcasing interactive courses,
     practical terminal labs, and educational modules.

3. Dice Roll Game
   - Interactive dice game built using JavaScript DOM manipulation,
     physics-style CSS keyframe rolling animations, and score tracking.

4. To-Do List
   - Task management application with LocalStorage persistence,
     task completion toggling, and clean responsive UI.

SERVICES AIMED TO OFFER:
- Responsive Website Development
- Landing Page Design
- Personal Portfolio Websites
- Basic Website Maintenance
=================================================================`;

      const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.download = 'Yoonus_Khan_CV.txt';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);

      showToast('CV downloaded successfully!', '📄');
      closeCVModal();
    });
  }

  // ----------------------------------------------------------------------------
  // 13. INTERACTIVE PROJECT DEMO MODALS
  // ----------------------------------------------------------------------------
  const demoModal = document.getElementById('demo-modal');
  const demoModalTitle = document.getElementById('demo-modal-title');
  const demoModalBody = document.getElementById('demo-modal-body');
  const demoModalClose = document.getElementById('demo-modal-close');
  const projectDemoButtons = document.querySelectorAll('.project-demo-btn');

  function openDemoModal(projectType) {
    if (!demoModal || !demoModalBody || !demoModalTitle) return;

    if (projectType === 'dice-game') {
      demoModalTitle.textContent = '🎲 Dice Roll Game - Interactive Demo';
      demoModalBody.innerHTML = `
        <div class="demo-interactive-box">
          <p style="text-align: center; margin-bottom: 16px;">
            Click <strong>"Roll Dice"</strong> to test this JavaScript DOM-powered mini game!
          </p>
          <div class="interactive-dice-arena">
            <div class="interactive-dice" id="interactive-dice-display">
              <!-- Default 5 pips -->
              <span class="dice-dot" style="grid-area: 1 / 1;"></span>
              <span class="dice-dot" style="grid-area: 1 / 3;"></span>
              <span class="dice-dot" style="grid-area: 2 / 2;"></span>
              <span class="dice-dot" style="grid-area: 3 / 1;"></span>
              <span class="dice-dot" style="grid-area: 3 / 3;"></span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--electric-blue);" id="dice-result-text">
              Current Roll: 5
            </div>
            <div style="display: flex; gap: 12px;">
              <button type="button" class="btn btn-primary" id="roll-dice-btn">
                🎲 Roll Dice!
              </button>
              <button type="button" class="btn btn-outline" id="reset-dice-btn">
                Reset
              </button>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);" id="dice-stats-text">
              Total Rolls: 0 &bull; Highest: 5
            </div>
          </div>
        </div>
      `;

      initDiceGameLogic();

    } else if (projectType === 'todo-list') {
      demoModalTitle.textContent = '📝 To-Do List - Interactive Demo';
      demoModalBody.innerHTML = `
        <div class="demo-interactive-box">
          <p style="margin-bottom: 14px;">
            Test the live JavaScript task manager. Add, complete, and remove tasks below:
          </p>
          <div class="interactive-todo-app">
            <div class="todo-input-bar">
              <input type="text" id="demo-todo-input" class="form-input" placeholder="What needs to be done?" style="padding: 10px 14px;">
              <button type="button" class="btn btn-primary btn-sm" id="demo-todo-add-btn">Add Task</button>
            </div>
            <ul class="todo-list-items" id="demo-todo-items">
              <li class="todo-item-row done" data-id="1">
                <span>Review portfolio responsiveness</span>
                <div>
                  <button type="button" class="todo-del-btn" title="Delete">✕</button>
                </div>
              </li>
              <li class="todo-item-row" data-id="2">
                <span>Practice JavaScript DOM manipulation</span>
                <div>
                  <button type="button" class="todo-del-btn" title="Delete">✕</button>
                </div>
              </li>
              <li class="todo-item-row" data-id="3">
                <span>Commit code to GitHub repository</span>
                <div>
                  <button type="button" class="todo-del-btn" title="Delete">✕</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      `;

      initTodoListLogic();

    } else if (projectType === 'cyberlearn') {
      demoModalTitle.textContent = '🛡️ CyberLearn - Platform Simulation';
      demoModalBody.innerHTML = `
        <div class="demo-interactive-box" style="background: #050a14; font-family: monospace;">
          <div style="color: #10b981; margin-bottom: 10px;">[CYBERLEARN SECURITY LAB INITIALIZED]</div>
          <p style="color: #38bdf8; font-size: 0.9rem; margin-bottom: 14px;">
            Welcome to the CyberLearn interactive simulation. Available modules:
          </p>
          <div style="display: grid; gap: 8px; margin-bottom: 16px;">
            <div style="background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.2);">
              <span style="color: #00d2ff; font-weight: bold;">Lab 01:</span> Network Reconnaissance Basics (Active)
            </div>
            <div style="background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.2);">
              <span style="color: #00d2ff; font-weight: bold;">Lab 02:</span> Web Vulnerability Scanning (SQLi & XSS)
            </div>
            <div style="background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.2);">
              <span style="color: #00d2ff; font-weight: bold;">Lab 03:</span> Cryptography & Hash Functions
            </div>
          </div>
          <div style="text-align: right;">
            <a href="https://github.com/Yoonu-A/CyberLearn" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              Explore CyberLearn on GitHub &rarr;
            </a>
          </div>
        </div>
      `;
    }

    demoModal.style.display = 'flex';
    body.style.overflow = 'hidden';
  }

  function closeDemoModal() {
    if (!demoModal) return;
    demoModal.style.display = 'none';
    body.style.overflow = '';
  }

  projectDemoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectType = btn.getAttribute('data-project');
      openDemoModal(projectType);
    });
  });

  if (demoModalClose) {
    demoModalClose.addEventListener('click', closeDemoModal);
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeDemoModal();
    });
  }

  // Interactive Dice Game Logic inside Modal
  function initDiceGameLogic() {
    const rollBtn = document.getElementById('roll-dice-btn');
    const resetBtn = document.getElementById('reset-dice-btn');
    const diceDisplay = document.getElementById('interactive-dice-display');
    const resultText = document.getElementById('dice-result-text');
    const statsText = document.getElementById('dice-stats-text');

    let rollCount = 0;
    let highestRoll = 5;

    // Dice dot patterns for 1 through 6
    const dicePatterns = {
      1: [[2, 2]],
      2: [[1, 1], [3, 3]],
      3: [[1, 1], [2, 2], [3, 3]],
      4: [[1, 1], [1, 3], [3, 1], [3, 3]],
      5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
      6: [[1, 1], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]]
    };

    function renderDicePips(value) {
      if (!diceDisplay) return;
      diceDisplay.innerHTML = '';
      const positions = dicePatterns[value] || dicePatterns[1];
      positions.forEach(([row, col]) => {
        const dot = document.createElement('span');
        dot.className = 'dice-dot';
        dot.style.gridArea = `${row} / ${col}`;
        diceDisplay.appendChild(dot);
      });
    }

    if (rollBtn) {
      rollBtn.addEventListener('click', () => {
        rollBtn.disabled = true;
        diceDisplay.classList.add('rolling');

        setTimeout(() => {
          const rolledNumber = Math.floor(Math.random() * 6) + 1;
          renderDicePips(rolledNumber);
          diceDisplay.classList.remove('rolling');

          rollCount++;
          if (rolledNumber > highestRoll) highestRoll = rolledNumber;

          resultText.textContent = `You Rolled: ${rolledNumber}! ${rolledNumber === 6 ? '🎉 (Jackpot!)' : ''}`;
          statsText.textContent = `Total Rolls: ${rollCount} • Highest: ${highestRoll}`;
          rollBtn.disabled = false;
        }, 400);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        rollCount = 0;
        highestRoll = 1;
        renderDicePips(1);
        resultText.textContent = 'Current Roll: 1';
        statsText.textContent = 'Total Rolls: 0 • Highest: 1';
      });
    }
  }

  // Interactive To-Do List Logic inside Modal
  function initTodoListLogic() {
    const todoInput = document.getElementById('demo-todo-input');
    const addBtn = document.getElementById('demo-todo-add-btn');
    const todoList = document.getElementById('demo-todo-items');

    function addTask() {
      if (!todoInput || !todoList) return;
      const text = todoInput.value.trim();
      if (!text) return;

      const li = document.createElement('li');
      li.className = 'todo-item-row';
      li.innerHTML = `
        <span>${escapeHTML(text)}</span>
        <div>
          <button type="button" class="todo-del-btn" title="Delete">✕</button>
        </div>
      `;

      todoList.prepend(li);
      todoInput.value = '';
      showToast('Task added!', '📝');
    }

    if (addBtn) addBtn.addEventListener('click', addTask);
    if (todoInput) {
      todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
      });
    }

    if (todoList) {
      todoList.addEventListener('click', (e) => {
        // Delete button click
        if (e.target.classList.contains('todo-del-btn')) {
          const row = e.target.closest('.todo-item-row');
          if (row) {
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 200);
            showToast('Task removed', '🗑️');
          }
          return;
        }

        // Toggle completed row
        const row = e.target.closest('.todo-item-row');
        if (row) {
          row.classList.toggle('done');
        }
      });
    }
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ----------------------------------------------------------------------------
  // 14. ACCESSIBILITY: ESCAPE KEY CLOSES ANY ACTIVE MODAL
  // ----------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvModal && cvModal.style.display !== 'none') closeCVModal();
      if (demoModal && demoModal.style.display !== 'none') closeDemoModal();
    }
  });

});
