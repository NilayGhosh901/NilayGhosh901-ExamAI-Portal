// Theme Management (without localStorage)
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.querySelector('.theme-icon');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// Typing Animation for Hero Section
class TypingAnimation {
  constructor() {
    this.heroTypingText = "Prepare smarter, achieve better results with AI assistance";
    this.typedTextSpan = document.getElementById('typed-text');
    this.cursor = document.querySelector('.cursor');
    this.charIndex = 0;
    this.isTyping = false;
  }

  start() {
    if (this.isTyping) return;
    this.isTyping = true;
    this.typeHeroText();
  }

  typeHeroText() {
    if (this.charIndex < this.heroTypingText.length) {
      this.typedTextSpan.textContent += this.heroTypingText.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typeHeroText(), 50);
    } else {
      this.isTyping = false;
    }
  }
}

// Navigation and Scrolling
class NavigationManager {
  constructor() {
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.navLinks = document.getElementById('nav-links');
    this.init();
  }

  init() {
    this.highlightActiveLink();
    this.setupMobileMenu();
  }

  setupMobileMenu() {
    if (this.mobileMenuToggle && this.navLinks) {
      this.mobileMenuToggle.addEventListener('click', () => {
        this.mobileMenuToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
      });

      // Close menu when clicking a link
      const links = this.navLinks.querySelectorAll('.nav-link');
      links.forEach(link => {
        link.addEventListener('click', () => {
          this.mobileMenuToggle.classList.remove('active');
          this.navLinks.classList.remove('active');
        });
      });

      // Close menu when clicking outside (only when menu is open)
      document.addEventListener('click', (e) => {
        if (this.navLinks.classList.contains('active')) {
          if (!e.target.closest('.navbar') && !e.target.closest('.nav-links')) {
            this.mobileMenuToggle.classList.remove('active');
            this.navLinks.classList.remove('active');
          }
        }
      });

      // Prevent body scroll when menu is open on mobile
      if (window.innerWidth <= 768) {
        this.mobileMenuToggle.addEventListener('click', () => {
          if (this.navLinks.classList.contains('active')) {
            document.body.style.overflow = '';
          } else {
            document.body.style.overflow = 'hidden';
          }
        });
      }

      // Handle resize events to reset menu state
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768) {
            this.mobileMenuToggle.classList.remove('active');
            this.navLinks.classList.remove('active');
            document.body.style.overflow = '';
          }
        }, 250);
      });

      // Handle orientation change
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          if (window.innerWidth > 768) {
            this.mobileMenuToggle.classList.remove('active');
            this.navLinks.classList.remove('active');
            document.body.style.overflow = '';
          }
        }, 100);
      });
    }
  }

  highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Simple check if the link href matches the end of the current path
      if (href && currentPath.endsWith(href)) {
        link.classList.add('active');
      } else if (currentPath.endsWith('/') && href === 'index.html') {
        // Handle root path mapping to index.html
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Study Plans Manager
class StudyPlansManager {
  constructor() {
    this.categoryCards = document.querySelectorAll('.category-card');
    this.studyPlanContent = document.getElementById('study-plan-content');
    this.studyPlans = {
      ssc: {
        title: 'SSC Study Plan - 6 Months',
        items: [
          'Month 1-2: Quantitative Aptitude fundamentals',
          'Month 3-4: Reasoning and General Intelligence',
          'Month 5: General Knowledge and Current Affairs',
          'Month 6: English Language and Mock Tests'
        ]
      },
      upsc: {
        title: 'UPSC Study Plan - 12 Months',
        items: [
          'Month 1-3: History, Geography, and Polity basics',
          'Month 4-6: Economy, Science & Technology',
          'Month 7-9: Current Affairs and Ethics',
          'Month 10-12: Answer Writing and Mock Tests'
        ]
      },
      banking: {
        title: 'Banking Exam Plan - 4 Months',
        items: [
          'Month 1: Quantitative Aptitude and Data Interpretation',
          'Month 2: Reasoning Ability and Computer Awareness',
          'Month 3: English Language and Banking Awareness',
          'Month 4: Current Affairs and Mock Tests'
        ]
      }
    };
    this.init();
  }

  init() {
    this.categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        this.selectCategory(card);
      });
    });
  }

  selectCategory(selectedCard) {
    // Remove active class from all cards
    this.categoryCards.forEach(card => card.classList.remove('active'));

    // Add active class to selected card
    selectedCard.classList.add('active');

    // Get category and update content
    const category = selectedCard.getAttribute('data-category');
    this.updateStudyPlan(category);
  }

  updateStudyPlan(category) {
    const plan = this.studyPlans[category];
    if (!plan || !this.studyPlanContent) return;

    const itemsList = plan.items.map(item => `<li>${item}</li>`).join('');

    this.studyPlanContent.innerHTML = `
      <h4>${plan.title}</h4>
      <ul class="study-checklist">
        ${itemsList}
      </ul>
    `;
  }
}

// AI Demo Manager
class AIDemoManager {
  constructor() {
    this.aiInput = document.getElementById('ai-input');
    this.aiResponseBox = document.getElementById('ai-response');
    this.submitQueryBtn = document.getElementById('submit-query');
    this.clearDemoBtn = document.getElementById('clear-demo');

    this.examResponses = [
      "Based on exam analysis, I recommend focusing on current affairs from the last 6 months for better results.",
      "For quantitative aptitude, practice at least 20 questions daily and focus on time management techniques.",
      "Your weak areas appear to be in reasoning. I suggest daily practice of logical puzzles and patterns.",
      "For essay writing, structure your answers with clear introduction, body, and conclusion within time limits.",
      "General knowledge requires consistent reading. Follow reliable news sources and make monthly revision notes.",
      "Mock tests are crucial - take at least 2 per week and analyze your performance patterns carefully."
    ];

    this.keywordResponses = [
      { keyword: /study plan|preparation|strategy/i, response: this.examResponses[0] },
      { keyword: /math|quantitative|aptitude|calculation/i, response: this.examResponses[1] },
      { keyword: /reasoning|logic|puzzle/i, response: this.examResponses[2] },
      { keyword: /writing|essay|answer/i, response: this.examResponses[3] },
      { keyword: /knowledge|gk|current affairs/i, response: this.examResponses[4] },
      { keyword: /test|mock|practice|exam/i, response: this.examResponses[5] },
      { keyword: /ssc|upsc|banking|government/i, response: "Government exams require consistent preparation and understanding of exam patterns. Focus on your weak areas first." },
      { keyword: /time|management|speed/i, response: "Time management is crucial. Practice with timers and develop shortcuts for common question types." }
    ];

    this.init();
  }

  init() {
    if (this.submitQueryBtn) {
      this.submitQueryBtn.addEventListener('click', () => this.handleQuery());
    }

    if (this.aiInput) {
      this.aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleQuery();
          e.preventDefault();
        }
      });
    }

    if (this.clearDemoBtn) {
      this.clearDemoBtn.addEventListener('click', () => this.clearDemo());
    }
  }

  handleQuery() {
    if (!this.aiInput || !this.aiResponseBox) return;

    const query = this.aiInput.value.trim();
    if (!query) {
      alert('Please enter a question before clicking Ask AI');
      return;
    }

    const response = this.getAIResponse(query);
    this.showAIResponse(response);
  }

  getAIResponse(input) {
    for (let item of this.keywordResponses) {
      if (item.keyword.test(input)) {
        return item.response;
      }
    }
    // Return random response if no keyword matches
    return this.examResponses[Math.floor(Math.random() * this.examResponses.length)];
  }

  showAIResponse(text) {
    if (!this.aiResponseBox) return;

    this.aiResponseBox.innerHTML = '<span class="loading"></span>';

    setTimeout(() => {
      this.aiResponseBox.innerHTML = '';
      this.typeAIText(text, this.aiResponseBox);
    }, 800);
  }

  typeAIText(text, container) {
    let i = 0;
    const p = document.createElement('p');
    p.className = 'ai-response-text';
    container.appendChild(p);

    const typeNextChar = () => {
      if (i <= text.length) {
        p.textContent = text.substring(0, i);
        i++;
        setTimeout(typeNextChar, 30);
      }
    };

    typeNextChar();
  }

  clearDemo() {
    if (this.aiInput) {
      this.aiInput.value = '';
    }
    if (this.aiResponseBox) {
      this.aiResponseBox.innerHTML = '<p class="response-placeholder">Ask me anything about exam preparation and I\'ll help you!</p>';
    }
  }
}

// Contact Form Manager
class ContactFormManager {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.messageInput = document.getElementById('message');
    this.nameError = document.getElementById('name-error');
    this.emailError = document.getElementById('email-error');
    this.messageError = document.getElementById('message-error');
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(errorElement, inputElement, message) {
    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
      inputElement.classList.add('error');
    }
  }

  clearError(errorElement, inputElement) {
    if (errorElement && inputElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
      inputElement.classList.remove('error');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (!this.nameInput || !this.nameInput.value.trim()) {
      this.showError(this.nameError, this.nameInput, 'Name is required.');
      isValid = false;
    } else {
      this.clearError(this.nameError, this.nameInput);
    }

    // Validate email
    if (!this.emailInput || !this.emailInput.value.trim()) {
      this.showError(this.emailError, this.emailInput, 'Email is required.');
      isValid = false;
    } else if (!this.validateEmail(this.emailInput.value.trim())) {
      this.showError(this.emailError, this.emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      this.clearError(this.emailError, this.emailInput);
    }

    // Validate message
    if (!this.messageInput || !this.messageInput.value.trim()) {
      this.showError(this.messageError, this.messageInput, 'Message is required.');
      isValid = false;
    } else {
      this.clearError(this.messageError, this.messageInput);
    }

    if (isValid) {
      alert('Thank you for your feedback! We have received your message and will get back to you soon.');
      this.contactForm.reset();
    }
  }
}

// Newsletter Manager
class NewsletterManager {
  constructor() {
    this.forms = document.querySelectorAll('.newsletter-form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  }

  handleSubmit(e, form) {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');

    if (emailInput && emailInput.value.trim()) {
      // Simulate API call with timeout
      const btn = form.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Subscribing...';
      btn.disabled = true;

      setTimeout(() => {
        alert(`Thanks for subscribing! Updates will be sent to ${emailInput.value}`);
        form.reset();
        btn.textContent = 'Subscribed!';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1000);
    }
  }
}

// Interactive Cards Manager
class InteractiveCardsManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupResourceCards();
    this.setupAIToolCards();
  }

  setupResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
      const button = card.querySelector('.btn');
      if (button) {
        button.addEventListener('click', () => {
          const title = card.querySelector('.resource-title');
          const titleText = title ? title.textContent : 'This feature';
          alert(`${titleText} is coming soon! Stay tuned for updates.`);
        });
      }
    });
  }

  setupAIToolCards() {
    const aiToolCards = document.querySelectorAll('.ai-tool-card');
    aiToolCards.forEach(card => {
      card.addEventListener('click', () => {
        const tool = card.getAttribute('data-tool');
        const titleElement = card.querySelector('.tool-title');
        const title = titleElement ? titleElement.textContent : 'This tool';

        const messages = {
          'analyzer': 'Performance Analyzer will help you identify your strengths and weaknesses!',
          'generator': 'Question Generator will create custom practice questions for you!',
          'tutor': 'AI Study Assistant is ready to answer your questions 24/7!',
          'predictor': 'Score Predictor will estimate your exam performance based on practice tests!'
        };

        alert(messages[tool] || `${title} is coming soon!`);
      });
    });
  }
}

// Scroll Animations Manager
class ScrollAnimationsManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);

    // Observe elements that should fade in
    const elementsToObserve = document.querySelectorAll('.resource-card, .ai-tool-card, .project-card, .exam-item');
    elementsToObserve.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
}

// Main Application Class
class ExamAIPortalApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all managers with error handling
      this.themeManager = new ThemeManager();
      this.typingAnimation = new TypingAnimation();
      this.navigationManager = new NavigationManager();
      this.studyPlansManager = new StudyPlansManager();
      this.aiDemoManager = new AIDemoManager();
      this.contactFormManager = new ContactFormManager();
      this.newsletterManager = new NewsletterManager();
      this.interactiveCardsManager = new InteractiveCardsManager();
      this.scrollAnimationsManager = new ScrollAnimationsManager();

      // Start typing animation with shorter delay
      setTimeout(() => {
        if (this.typingAnimation && this.typingAnimation.typedTextSpan) {
          this.typingAnimation.start();
        }
      }, 500);

      // Add some interactive feedback
      this.addGlobalInteractions();

      console.log('ExamAI Portal initialized successfully');
    } catch (error) {
      console.error('Error initializing ExamAI Portal:', error);
    }
  }

  addGlobalInteractions() {
    // Add hover effects for developer card
    const developerCard = document.querySelector('.developer-card');
    if (developerCard) {
      developerCard.addEventListener('mouseenter', () => {
        developerCard.style.transform = 'translateY(-8px) scale(1.02)';
      });

      developerCard.addEventListener('mouseleave', () => {
        developerCard.style.transform = 'translateY(0) scale(1)';
      });
    }

    // Add click feedback for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = 'scale(1)';
        }, 150);
      });
    });

    // Add ripple effect to buttons (only on desktop)
    if (window.innerWidth > 768) {
      this.addRippleEffect();
    }

    // Removed parallax for performance
    // Removed duplicate scroll animations (already handled by ScrollAnimationsManager)
    // Removed card tilt for better mobile performance
  }

  addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  addParallaxEffect() {
    // Removed parallax effect for better performance
    // Parallax was causing lag on mobile devices
  }

  // Removed duplicate scroll animations - already handled by ScrollAnimationsManager

  // Removed card tilt effect for better mobile performance

  // Removed counter animation - no counters in current design
}

// Initialize the application
const app = new ExamAIPortalApp();