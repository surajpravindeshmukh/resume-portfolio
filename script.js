/**
 * Modern Resume - Interactive Features
 * Dynamic experience calculator integrated naturally into the sentence
 * Includes mobile-friendly tooltips and interactive UI elements
 */

(function () {
  'use strict';

  // ============================================
  // SECTION 1: DYNAMIC EXPERIENCE CALCULATOR
  // ============================================

  // Function to calculate experience from start date to today
  function calculateTotalExperience(startDate) {
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Adjust for day of month (if today's date is before start date's day)
    if (today.getDate() < startDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return { years, months };
  }

  // Function to format experience naturally (e.g., "8 years and 3 months" or "8.5 years")
  function formatExperienceNatural(years, months) {
    if (years === 0 && months === 0) return "just started";

    // If months are 6 or more, round to .5
    if (months >= 6) {
      const halfYear = years + 0.5;
      if (Number.isInteger(halfYear)) {
        return `${halfYear} years`;
      }
      return `${halfYear} years`;
    }

    // If months are less than 6, show as exact years and months
    if (months === 0) {
      return `${years} years`;
    }

    if (months === 1) {
      return `${years} years and ${months} month`;
    }

    return `${years} years and ${months} months`;
  }

  // Function to update the hero subtitle with natural experience text
  function updateExperienceInHero() {
    // Start date: February 26, 2018
    const startDate = new Date(2018, 1, 26); // Month is 0-indexed, so 1 = February

    // Calculate experience
    const { years, months } = calculateTotalExperience(startDate);
    const experienceText = formatExperienceNatural(years, months);

    // Find the hero subtitle element
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroSubtitle) {
      // Get the current HTML
      let currentHTML = heroSubtitle.innerHTML;

      // Replace the hardcoded "7+ years" or any existing experience text with dynamic one
      const experiencePattern = /\d+(?:\+)?\s*years(?:\s+and\s+\d+\s+months?)?/i;

      if (experiencePattern.test(currentHTML)) {
        // Replace existing experience text with dynamic one
        currentHTML = currentHTML.replace(experiencePattern, experienceText);
        heroSubtitle.innerHTML = currentHTML;
        console.log(`✅ Experience updated: ${experienceText}`);
      } else {
        // If pattern not found, try to insert after the quote icon
        const quoteIcon = '<i class="fas fa-quote-left" style="margin-right: 6px; opacity: 0.6;"></i>';
        if (currentHTML.includes(quoteIcon)) {
          // Insert experience text after the quote icon
          const newHTML = currentHTML.replace(quoteIcon, `${quoteIcon} ${experienceText} `);
          heroSubtitle.innerHTML = newHTML;
          console.log(`✅ Experience inserted: ${experienceText}`);
        } else {
          console.warn('⚠️ Could not find place to insert experience text');
        }
      }
    } else {
      console.warn('⚠️ Hero subtitle element not found');
    }
  }

  // ============================================
  // SECTION 2: INTERACTIVE MODALS
  // ============================================
  // Modal system handles all interactive content

  // ============================================
  // SECTION 3: SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================

  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // ============================================
  // SECTION 4: SKILL BADGE ANIMATIONS
  // ============================================

  function initSkillBadgeAnimations() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
      badge.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }

  // ============================================
  // SECTION 5: FADE-IN ANIMATIONS FOR JOB ITEMS
  // ============================================

  function initFadeInAnimations() {
    const jobItems = document.querySelectorAll('.job-item, .edu-item');
    jobItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // ============================================
  // SECTION 6: CONTACT ITEMS HOVER EFFECTS
  // ============================================

  function initContactHoverEffects() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', function () {
        // this.style.transform = 'translateX(5px)';
        // this.style.transition = 'transform 0.2s ease';
      });
      item.addEventListener('mouseleave', function () {
        // this.style.transform = 'translateX(0)';
      });
    });
  }

  // ============================================
  // SECTION 7: LINKEDIN LINK HANDLER
  // ============================================

  function initLinkedInLink() {
    const linkedinLink = document.querySelector('.contact-item a[href="#"]');
    if (linkedinLink && linkedinLink.getAttribute('href') === '#') {
      linkedinLink.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('LinkedIn profile link - update with actual URL when available');
      });
    }
  }

  // ============================================
  // SECTION 8: LAZY LOADING & VIEWPORT FIXES
  // ============================================

  function initLazyLoading() {
    const profileImage = document.querySelector('.profile-frame img');
    if (profileImage) {
      profileImage.loading = 'lazy';
    }
  }

  function initViewportFix() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVH);
    setVH();
  }

  // ============================================
  // SECTION 9: INITIALIZE EVERYTHING
  // ============================================

  function init() {
    console.log('🚀 Suraj Deshmukh Resume - Initializing...');

    // Initialize experience calculator
    updateExperienceInHero();

    // Initialize interactive features
    initSmoothScrolling();
    initSkillBadgeAnimations();
    initFadeInAnimations();
    initContactHoverEffects();
    initLinkedInLink();
    initLazyLoading();
    initViewportFix();

    // Initialize PDF download
    initPDFDownload();

    initInterestModal();

    console.log('✅ All features initialized successfully!');
  }

  // ============================================
  // SECTION 10: PDF DOWNLOAD ON ROLE TAG CLICK
  // ============================================

  function initPDFDownload() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.print();
      });
    }
  }

  // Modal functionality for interests
  function initInterestModal() {
    const modal = document.getElementById('interestModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');

    // Content for each interest
    const contentMap = {
      travel: {
        title: 'Travel & Motorcycle Riding',
        body: `
        <h4 style="color: var(--secondary); margin: 0 0 10px 0;">Travel</h4>
        <p><strong>Traveled across 9 Indian states</strong><br>
        <strong>Explored 2 countries</strong> alongside family and friends</p>
    
        <h4 style="color: var(--secondary); margin: 20px 0 10px 0;">Motorcycle Riding</h4>
        <p>I have always been passionate about motorcycle riding. From riding to college during student life to commuting to office after starting my career, bikes have always been a part of my journey.</p>
        <p>I currently own a <strong>Triumph Scrambler 400X</strong>, and riding gives me a sense of peace and freedom. I now ride occasionally whenever I get time away from work.</p>
        <p style="margin-top: 20px; font-style: italic; opacity: 0.8;">✨ Looking forward to adding more stamps to the passport and more trails to the tires</p>
        `
      },
      numismatics: {
        title: 'Numismatics',
        body: `
        <p>I developed an interest in collecting coins and currencies when my family and I started visiting foreign countries.</p>
        <p>Over time, it became a meaningful way to preserve memories, cultures, and travel experiences. Each coin tells a unique story from a different corner of the world.</p>
      `
      },
      social: {
        title: 'Social Experiences',
        body: `
        <p>I deeply value meaningful social connections and collaborative environments:</p>
        <ul>
          <li>Social gatherings with friends and family</li>
          <li>Team outings and offsites</li>
          <li>Networking & knowledge sharing sessions</li>
          <li>Hanging out with friends over coffee</li>
        </ul>
        <p>These experiences enrich both personal and professional life.</p>
      `
      },
      // Hero subtitle topics
      'angular-dotnet': {
        title: 'Angular & .NET Solutions',
        body: `
        <ul>
          <li>Built with Angular 21 & .NET Web API</li>
          <li>Delivered full-stack enterprise applications</li>
          <li>Integrated REST APIs & databases</li>
        </ul>
      `
      },
      mentoring: {
        title: 'Mentoring Developers',
        body: `
        <ul>
          <li>Led team of 4-6 developers</li>
          <li>Provided debugging guidance & technical mentoring</li>
          <li>Regular code reviews & knowledge sharing</li>
        </ul>
      `
      },
      'technical-design': {
        title: 'Technical Design Work',
        body: `
        <ul>
          <li>Upgraded Angular 10 → 21 across projects</li>
          <li>Migrated from older frameworks to modern Angular</li>
          <li>Improved performance using lazy loading</li>
        </ul>
      `
      },
      'large-scale': {
        title: 'Large-Scale Systems',
        body: `
        <ul>
          <li>Designed scalable frontend architecture</li>
          <li>Built secure fintech solutions</li>
          <li>Created reusable components across projects</li>
        </ul>
      `
      },
      // Sodel Solutions projects
      'yes-pay': {
        title: 'YES Pay Suite',
        body: `
        <p><strong>YES Pay Assist:</strong> Admin portal - manage partner configurations</p>
        <p><strong>YES Pay Hub:</strong> Partner portal - digital product management</p>
        <p><strong>FD Portal:</strong> Fixed deposit opening & management</p>
        <p><strong>Dynamic URLs:</strong> Welcome letters & partner links</p>
        <p><strong>Gift Card Portal:</strong> Issuance & redemption platform</p>
      `
      },
      derivium: {
        title: 'DeriviumData',
        body: `
        <p><strong>Financial Securities Analytics Platform</strong></p>
        <ul>
          <li>Search & track stocks, shares using ISIN, DID, symbols</li>
          <li>Price movements, trade volumes & transaction trends</li>
          <li>Analytics-driven insights on trading patterns & market activity</li>
        </ul>
      `
      },
      gsb: {
        title: 'GSB Bookings',
        body: `
        <p><strong>Temple Management System</strong></p>
        <ul>
          <li>Manages multiple temples under single trust</li>
          <li>Event & Puja booking system for devotees</li>
          <li>Admin portal for backend management</li>
        </ul>
      `
      },
      hammer: {
        title: 'HAMMER',
        body: `
        <p><strong>Legacy Migration Project</strong></p>
        <ul>
          <li>Migrated Fox Pro application to .NET</li>
          <li>JavaScript for frontend development</li>
          <li>Modernized legacy system architecture</li>
        </ul>
      `
      },
      // MITS Global projects
      plum: {
        title: 'PLUM',
        body: `
        <ul>
          <li>Lead management system for partners</li>
          <li>Managed partner onboarding & tracking workflows</li>
        </ul>
      `
      },
      swift: {
        title: 'SWIFT',
        body: `
        <ul>
          <li>Digital client on-boarding platform</li>
          <li>Real-time transaction tracking</li>
          <li>Customer insights & analytics</li>
          <li>Auto-filled investor applications</li>
          <li>Top-up & redemption transactions</li>
        </ul>
      `
      },
      // Green Point projects
      'tg-campus': {
        title: 'TG Campus',
        body: `
        <ul>
          <li>Online learning & test prep platform for grades 5-12</li>
          <li>LMS with live classes, recorded sessions & interactive learning</li>
          <li>Batch, course, section, lecture & live session management</li>
          <li>Assessments, self-practice & motivation-based learning modules</li>
        </ul>
      `
      },
      cms: {
        title: 'CMS',
        body: `
        <p><strong>Centralized Content Management System</strong> integrated with TG Campus</p>
        <ul>
          <li>Manage & map questionnaire and assessment content</li>
          <li>Content assigned to batches, courses, sections, lectures & live sessions</li>
          <li>Structured content delivery & assessment integration</li>
        </ul>
      `
      }
    };

    let hoverTimeout;
    let isModalVisible = false;

    // Get all modal triggers
    const triggers = document.querySelectorAll('.modal-trigger');

    triggers.forEach(trigger => {
      // Hover events for desktop
      trigger.addEventListener('mouseenter', function (e) {
        if (window.innerWidth > 768) {
          clearTimeout(hoverTimeout);
          const modalId = this.getAttribute('data-modal');
          const content = contentMap[modalId];

        if (content) {
            // Build modal content
            const iconElement = this.querySelector('i');
            const iconClass = iconElement ? iconElement.className : 'fas fa-info-circle';
            
            modalBody.innerHTML = `
            <div class="modal-header">
              <h3><i class="${iconClass}"></i> ${content.title}</h3>
            </div>
            <div class="modal-body">
              ${content.body}
            </div>
          `;

            // Show the modal centered by CSS flexbox
            modal.style.display = 'flex';
            modal.classList.add('active');
            isModalVisible = true;
          }
        }
      });

      trigger.addEventListener('mouseleave', function () {
        if (window.innerWidth > 768) {
          hoverTimeout = setTimeout(() => {
            modal.classList.remove('active');
            modal.style.display = 'none';
            isModalVisible = false;
          }, 200);
        }
      });

      // Click events for mobile / touch devices
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 || !window.matchMedia('(hover: hover)').matches) {
          e.stopPropagation();
          const modalId = this.getAttribute('data-modal');
          const content = contentMap[modalId];

          if (content) {
            const iconElement = this.querySelector('i');
            const iconClass = iconElement ? iconElement.className : 'fas fa-info-circle';
            
            modalBody.innerHTML = `
            <div class="modal-header">
              <h3><i class="${iconClass}"></i> ${content.title}</h3>
            </div>
            <div class="modal-body">
              ${content.body}
            </div>
          `;
            modal.style.display = 'flex';
            modal.classList.add('active');
          }
        }
      });
    });

    // Close modal
    function closeModal() {
      modal.style.display = 'none';
      modal.classList.remove('active');
      isModalVisible = false;
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Prevent modal from closing when hovering over it
    modal.addEventListener('mouseenter', function () {
      if (window.innerWidth > 768) {
        clearTimeout(hoverTimeout);
      }
    });

    modal.addEventListener('mouseleave', function () {
      if (window.innerWidth > 768) {
        closeModal();
      }
    });
  }

  // Call this in your init() function
  // Add: initInterestModal();

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();